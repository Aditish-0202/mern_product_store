import Product  from "../models/product.model.js";
import mongoose from "mongoose";



export const getProducts = async (req, res) => {
try{
const products = await Product.find({}); // empty object means we are fetching all the products
console.log("Fetched products:", products);
res.status(200).json({ success: true, products });
} catch (error){
console.error("Error fetching products:", error);
res.status(500).json({ success: false, message: "Internal server error" });
}
};





export const createProduct = async (req, res) =>{
    const product = req.body; // user will send this data

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({ success: false, message: "Please fill all the fields"});
    }

    const newProduct = new Product(product);

    try{
        await newProduct.save(); // this will save the product in the database as all the required fields are fulfilled 
        res.status(201).json({ success: true, message: "Product created successfully", data: newProduct });
    }catch (error) {
        ("Error creating product:", error.message);
        res.status(500).json({success: false, message: "Internal server error"});
    }

};


export const updateProduct = async(req, res)=>{
    const {id }= req.params;

    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
       return res.status(404).json({success:false , message : "product not found OR innvalid Id"});
    }

    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({success:true , data : updatedProduct});
    }catch (error){
        res.status(500).json({success: false, message: "server error"});
    }
};


export const deleteProduct = async(req, res)=>{
    const{id} = req.params; // this will get the id from the url
    console.log("id:",id);

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false , message : "product not found OR innvalid Id"});
     }
    
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted successfully" });
     } catch (error){
        res.status(500).json({success: false, message: "Server side error"});
     }
};