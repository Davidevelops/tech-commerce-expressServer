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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitOrder = exports.getUserOrder = exports.getOrders = void 0;
const orderModel_1 = require("../model/orderModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield orderModel_1.Order.find();
        res.status(200).json({ orders });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getOrders = getOrders;
const getUserOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.jwt;
    if (!token) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        const userId = new mongoose_1.default.Types.ObjectId(decoded.id);
        const orders = yield orderModel_1.Order.find({ userId });
        res.status(200).json({
            orders,
        });
    }
    catch (error) {
        console.error("Error fetching user orders:", error);
        next(error);
    }
});
exports.getUserOrder = getUserOrder;
const submitOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.jwt;
    if (!token) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        const userId = decoded.id;
        const { orderName, orderQuantity, orderPrice, street, barangay, city, province, total, recipientName, recipientContact, } = req.body;
        if (!orderName || !orderQuantity || !orderPrice || !total) {
            res.status(400).json({ error: "Missing required order fields" });
            return;
        }
        const newOrder = new orderModel_1.Order({
            userId,
            orderName,
            orderQuantity,
            orderPrice,
            street,
            barangay,
            city,
            province,
            total,
            recipientName,
            recipientContact,
        });
        yield newOrder.save();
        res.status(201).json({ newOrder });
    }
    catch (error) {
        console.error(error);
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            res.status(401).json({ error: "Invalid or expired token" });
        }
        else if (error instanceof mongoose_1.default.Error.ValidationError) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
});
exports.submitOrder = submitOrder;
