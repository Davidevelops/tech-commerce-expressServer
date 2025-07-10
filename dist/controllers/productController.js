"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWearable = exports.getConsole = exports.getTablet = exports.getLaptop = exports.getMobile = exports.getNewArrivals = exports.deleteProduct = exports.updateProduct = exports.getProduct = exports.getProducts = exports.addProduct = void 0;
const productModel_1 = require("../model/productModel");
const errorHandler = (error) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = {
        productName: "",
        productDescription: "",
        productPrice: "",
        productCategory: "",
        productSubCategory: "",
    };
    if (error.message.includes("Product validation failed")) {
        Object.values(error.errors).forEach((error) => {
            const { properties } = error;
            if (properties && properties.path && properties.message) {
                errors[properties.path] = properties.message;
            }
            else {
                console.log("Unexpected validation error format:", error);
            }
        });
    }
    return errors;
});
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productName, productDescription, productPrice, productImages, productCategory, productSubCategory, properties, } = req.body;
        const newProduct = new productModel_1.Product({
            productName,
            productDescription,
            productPrice,
            productImages,
            productCategory,
            productSubCategory,
            properties,
        });
        yield newProduct.save();
        res.status(200).json({ newProduct });
    }
    catch (error) {
        let errors = yield errorHandler(error);
        res.status(400).json({ errors });
        console.log(error);
    }
});
exports.addProduct = addProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productModel_1.Product.find();
        res.status(200).json({ products });
    }
    catch (error) {
        console.error(error);
    }
});
exports.getProducts = getProducts;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield productModel_1.Product.findById(id);
        res.status(200).json({ product });
    }
    catch (error) {
        console.error(error);
    }
});
exports.getProduct = getProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { productName, productDescription, productPrice, productImages, productCategory, productSubCategory, properties, } = req.body;
    try {
        const updatedProduct = yield productModel_1.Product.findByIdAndUpdate(id, {
            productName,
            productDescription,
            productPrice,
            productImages,
            productCategory,
            productSubCategory,
            properties,
        }, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({ updatedProduct });
    }
    catch (error) {
        let errors = yield errorHandler(error);
        res.status(400).json({ errors });
        console.log(error);
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const products = yield productModel_1.Product.findByIdAndDelete(id);
        res.status(200).json({ products });
    }
    catch (error) {
        console.error(error);
    }
});
exports.deleteProduct = deleteProduct;
const getNewArrivals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newArrivals = yield productModel_1.Product.find().sort({ createdAt: -1 }).limit(7);
        res.status(200).json({ newArrivals });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getNewArrivals = getNewArrivals;
const getMobile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mobile = yield productModel_1.Product.find({ productCategory: "mobile" });
        res.status(200).json({ mobile });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getMobile = getMobile;
const getLaptop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const laptop = yield productModel_1.Product.find({ productCategory: "laptop" });
        res.status(200).json({ laptop });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getLaptop = getLaptop;
const getTablet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tablet = yield productModel_1.Product.find({ productCategory: "tablet" });
        res.status(200).json({ tablet });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getTablet = getTablet;
const getConsole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const console = yield productModel_1.Product.find({ productCategory: "gaming_console" });
        res.status(200).json({ console });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getConsole = getConsole;
const getWearable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const wearable = yield productModel_1.Product.find({ productCategory: "wearable" });
        res.status(200).json({ wearable });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getWearable = getWearable;
