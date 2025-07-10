"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const categoryController_1 = require("../controllers/categoryController");
const productController_1 = require("../controllers/productController");
const orderController_1 = require("../controllers/orderController");
const router = (0, express_1.Router)();
// Auth routes
router.post("/signUp", authController_1.signUp);
router.post("/logIn", authController_1.logIn);
// Product routes
router.post("/addProduct", productController_1.addProduct);
router.get("/getProducts", productController_1.getProducts);
router.get("/getNewArrivals", productController_1.getNewArrivals);
router.get("/getProduct/:id", productController_1.getProduct);
router.patch("/updateProduct/:id", productController_1.updateProduct);
router.delete("/deleteProduct/:id", productController_1.deleteProduct);
// Category routes
router.post("/addCategory", categoryController_1.addCategories);
router.get("/getCategories", categoryController_1.getCategories);
router.get("/getCategory/:id", categoryController_1.getCategory);
router.patch("/editCategory/:id", categoryController_1.editCategories);
router.delete("/deleteCategory/:id", categoryController_1.deleteCategories);
// Filter routes
router.get("/getMobile", productController_1.getMobile);
router.get("/getLaptop", productController_1.getLaptop);
router.get("/getTablet", productController_1.getTablet);
router.get("/getConsole", productController_1.getConsole);
router.get("/getWearable", productController_1.getWearable);
// Order routes
router.get("/getOrders", orderController_1.getOrders);
router.post("/submitOrder", orderController_1.submitOrder);
router.get("/getUserOrder", orderController_1.getUserOrder);
exports.default = router;
