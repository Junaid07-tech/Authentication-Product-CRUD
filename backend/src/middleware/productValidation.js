import { body, param } from "express-validator";

export const createProductValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Product name is required")
        .bail(),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required")
        .bail(),

    body("price")
        .notEmpty()
        .withMessage("Price is required")
        .bail()
        .isFloat({ min: 0 })
        .withMessage("Price must be a positive number")
        .bail(),

    body("category")
        .trim()
        .notEmpty()
        .withMessage("Category is required")
        .bail(),

    body("stock")
        .notEmpty()
        .withMessage("Stock is required")
        .bail()
        .isInt({ min: 0 })
        .withMessage("Stock must be a non-negative integer")
        .bail(),
];

export const productIdValidation = [
    param("id")
        .isMongoId()
        .withMessage("Invalid product ID")
        .bail(),
];

export const updateProductValidation = [
    body("name")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Product name cannot be empty")
        .bail(),

    body("description")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Description cannot be empty")
        .bail(),

    body("price")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Price must be a positive number")
        .bail(),

    body("category")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Category cannot be empty")
        .bail(),

    body("stock")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Stock must be a non-negative integer")
        .bail(),
];