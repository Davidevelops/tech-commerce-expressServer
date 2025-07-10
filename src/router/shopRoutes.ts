import { Router } from "express";
import { signUp, logIn } from "../controllers/authController";
import {
  addCategories,
  deleteCategories,
  editCategories,
  getCategories,
  getCategory,
} from "../controllers/categoryController";
import {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getNewArrivals,
  getMobile,
  getLaptop,
  getTablet,
  getConsole,
  getWearable,
} from "../controllers/productController";
import {
  getOrders,
  submitOrder,
  getUserOrder,
} from "../controllers/orderController";

const router = Router();

// Auth routes
router.post("/signUp", signUp);
router.post("/logIn", logIn);

// Product routes
router.post("/addProduct", addProduct);
router.get("/getProducts", getProducts);
router.get("/getNewArrivals", getNewArrivals);
router.get("/getProduct/:id", getProduct);
router.patch("/updateProduct/:id", updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);

// Category routes
router.post("/addCategory", addCategories);
router.get("/getCategories", getCategories);
router.get("/getCategory/:id", getCategory);
router.patch("/editCategory/:id", editCategories);
router.delete("/deleteCategory/:id", deleteCategories);

// Filter routes
router.get("/getMobile", getMobile);
router.get("/getLaptop", getLaptop);
router.get("/getTablet", getTablet);
router.get("/getConsole", getConsole);
router.get("/getWearable", getWearable);

// Order routes
router.get("/getOrders", getOrders);
router.post("/submitOrder", submitOrder);
router.get("/getUserOrder", getUserOrder);
export default router;
