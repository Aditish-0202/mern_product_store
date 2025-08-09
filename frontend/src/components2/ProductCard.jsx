import React, { useState } from "react";
import {
  Box,
  Image,
  Heading,
  Text,
  HStack,
  Button,
  VStack,
} from "@chakra-ui/react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
//import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { toaster } from "@/components/ui/toaster";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useProductStore } from "@/store/product";

export const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [open, setOpen] = useState(false);
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("rgb(255, 255, 255)", "rgb(3, 21, 46)");
  const { deleteProduct, updateProduct } = useProductStore();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toaster.create({
        title: "Error",
        description: message,
        type: "error",
        closable: true,
      });
    } else {
      toaster.create({
        title: "Success",
        description: message,
        type: "success",
        closable: true,
      });
    }
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    await updateProduct(pid, updatedProduct);
    setOpen(false);
  };

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-10px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        objectFit={"cover"}
        w={"full"}
        h={48}
      />

      <Box p={"4"}>
        <Heading as={"h3"} size={"md"} mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
          $ {product.price}
        </Text>

        <HStack spacing={2}>
          <Button
            bgColor= {"rgb(167, 169, 246)"}
            onClick={() => setOpen(true)}
            aria-label="Edit Product"
          >
            <EditIcon fontSize="20px" style={{ color: "rgb(0, 0, 0)" }} />
          </Button>
          <Button
            onClick={() => handleDeleteProduct(product._id)}
            bgColor= {"rgb(244, 154, 109)"}
            aria-label="Delete Product"
          >
            <DeleteIcon fontSize="20px" style={{ color: "rgb(0, 0, 0)" }} />
          </Button>
        </HStack>
      </Box>
      <Dialog
        PaperProps={{
          sx: {
            backgroundColor: "rgba(38, 38, 54, 1)",
          },
        }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle color="rgba(255, 250, 250, 1)">Update Product</DialogTitle>
        <DialogContent>
          <VStack spacing={4} sx={{ mt: 1 }}>
            <TextField
              InputLabelProps={{ style: { color: "rgba(255, 250, 250, 1)" } }}
              InputProps={{
                style: { color: "rgba(255, 250, 250, 1)" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#fff" },
                  "&:hover fieldset": { borderColor: "#fff" },
                  "&.Mui-focused fieldset": { borderColor: "#fff" },
                },
                "& .MuiInputLabel-root": { color: "#fff" },
              }}
              fullWidth
              label="Product Name"
              name="name"
              value={updatedProduct.name}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, name: e.target.value })
              }
              margin="dense"
            />
            <TextField
              InputLabelProps={{ style: { color: "rgba(255, 250, 250, 1)" } }}
              InputProps={{
                style: { color: "rgba(255, 250, 250, 1)" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#fff" },
                  "&:hover fieldset": { borderColor: "#fff" },
                  "&.Mui-focused fieldset": { borderColor: "#fff" },
                },
                "& .MuiInputLabel-root": { color: "#fff" },
              }}
              fullWidth
              label="Price"
              name="price"
              value={updatedProduct.price}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  price: e.target.value,
                })
              }
              margin="dense"
            />
            <TextField
              InputLabelProps={{ style: { color: "rgba(255, 250, 250, 1)" } }}
              InputProps={{
                style: { color: "rgba(255, 250, 250, 1)" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#fff" },
                  "&:hover fieldset": { borderColor: "#fff" },
                  "&.Mui-focused fieldset": { borderColor: "#fff" },
                },
                "& .MuiInputLabel-root": { color: "#fff" },
              }}
              fullWidth
              label="Image URL"
              name="image"
              value={updatedProduct.image}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  image: e.target.value,
                })
              }
              margin="dense"
            />
          </VStack>
        </DialogContent>
        <DialogActions>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => handleUpdateProduct(product._id, updatedProduct)}
          >
            Update
          </Button>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
