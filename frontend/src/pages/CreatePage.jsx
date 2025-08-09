import { useColorModeValue } from "@/components/ui/color-mode";
import { toaster } from "@/components/ui/toaster";
import { useProductStore } from "@/store/product";
import {
  Container,
  VStack,
  Heading,
  Box,
  Button,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const inputBorder = useColorModeValue("gray.400", "black");
  const inputBg = useColorModeValue("gray.200", "gray.700");

  const { createProduct } = useProductStore();
  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      console.log("Toaster Error Triggered");
      toaster.create({
        title: "Error",
        description: message,
        type : "error",
        closable: true,
      });
    } else {
      console.log("Toaster Success Triggered");
      toaster.create({
        title: "Success",
        description: "Product Created Successfully",
        type: 'success',
        closable: true,
      });
    }
    setNewProduct({name:"",  price:"", image: ""});
  };
  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>

        <Box
          bg={useColorModeValue("gray.300", "gray.800")}
          w={"50%"}
          p={6}
          rounded={"2xl"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              rounded={"2xl"}
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              bg={inputBg}
              border="1px solid"
              borderColor={inputBorder}
              _focus={{
                borderColor: "blue.400",
                boxShadow: "0 0 0 1px blue.400",
              }}
              _hover={{ borderColor: "blue.300" }}
              w="full"
            />

            <Input
              rounded={"2xl"}
              placeholder="Price"
              name="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              bg={inputBg}
              border="1px solid"
              borderColor={inputBorder}
              _focus={{
                borderColor: "blue.400",
                boxShadow: "0 0 0 1px blue.400",
              }}
              _hover={{ borderColor: "blue.300" }}
              w="full"
            />

            <Input
              rounded={"2xl"}
              placeholder="Image url"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
              bg={inputBg}
              border="1px solid"
              borderColor={inputBorder}
              _focus={{
                borderColor: "blue.400",
                boxShadow: "0 0 0 1px blue.400",
              }}
              _hover={{ borderColor: "blue.300" }}
              w="full"
            />

            <Button
              rounded={"2xl"}
              bg={"blue.500"} // initially we were using colorScheme but it wasn't working for some reason therefore manually setting the bg to blue and text to rgb
              color={"rgb(2, 5, 52)"} // this is dark blue color and makes the word (Add Product in dark blue shade )
              onClick={handleAddProduct}
              w="full"
              _hover={{borderColor:"cyan.100"}}
            >
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
