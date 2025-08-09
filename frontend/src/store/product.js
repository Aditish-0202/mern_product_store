import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill in all fields." };
    }
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      if (!res.ok) {
        const errorData = await res.json();
        return {
          success: false,
          message: errorData.message || "Failed to create product ",
        };
      }
      const data = await res.json();
      set((state) => ({ products: [...state.products, data.data] }));
      return { success: true, message: "Product Created Successfully" };
    } catch (err) {
      console.error("Fetch Failed:", err);
      return {
        success: false,
        message: "Something went wrong check network or server.",
      };
    }
  },
  fetchProducts: async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();

      console.log("API Response:", data) ; 

      if (Array.isArray(data.products)) {
        set({ products: data.products });
      } else {
        console.warn("API did not return a product array. recieved : ", data);
        set({ data: [] });
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      set({ products: [] }); // fallback on error too
    }
  },
  deleteProduct: async (pid) =>{
    const res = await fetch(`/api/products/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if(!data.success) return{success: false, message: data.message};

    //updates the ui immediately after deleting the product if we delete the below line above return , we will have to refreash the page in order the ui to update 
    set(state => ({ products : state.products.filter(product => product._id !==pid) }));
    return {success: true, message: data.message};
  },
  updateProduct: async (pid , updatedProduct) => {
    const res = await fetch (`/api/products/${pid}`,{
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json(); 
    if(!data.success) return { success: false , message: data.message}; 
    set(state => ({
      products: state.products.map(product => product._id === pid ? data.data : product)
    }))
  } 

}));
