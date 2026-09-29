import express from "express";
import { createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { createProductValidation, productIdValidation, updateProductValidation } from "../middleware/productValidation.js";
import validationMiddleware from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createProductValidation, validationMiddleware, createProduct);

router.get("/", getAllProducts);

router.get("/:id", productIdValidation, validationMiddleware, getSingleProduct);

router.put("/:id", authMiddleware, productIdValidation, updateProductValidation, validationMiddleware, updateProduct);

router.delete("/:id", authMiddleware, productIdValidation, validationMiddleware, deleteProduct);

export default router;