import express from "express";

const router = express.Router();


import { getProducts , createProduct, updateProduct, deleteProduct} from "../controllers/product.controller.js";

// we use post whenever we are creating something
// Api is the men in the middle which brings the order(request) and the product(response) 
router.post("/", createProduct );

router.get("/", getProducts );

router.put("/:id",updateProduct )

router.delete("/:id", deleteProduct );


export default router;