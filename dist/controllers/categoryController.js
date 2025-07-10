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
exports.deleteCategories = exports.editCategories = exports.addCategories = exports.getCategory = exports.getCategories = void 0;
const categoryModel_1 = require("../model/categoryModel");
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let categories = yield categoryModel_1.Category.find().populate("parent");
        res.status(200).json({ categories });
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.getCategories = getCategories;
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        let category = yield categoryModel_1.Category.findById(id).populate("parent");
        res.status(200).json({ category });
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.getCategory = getCategory;
const addCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, parent, properties } = req.body;
    try {
        const newCategory = new categoryModel_1.Category({
            name,
            parent,
            properties,
        });
        yield newCategory.save();
        res.status(201).json({ newCategory });
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.addCategories = addCategories;
const editCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, parent, properties } = req.body;
    try {
        let editedCategory = yield categoryModel_1.Category.findByIdAndUpdate(id, { name, parent, properties }, { new: true, runValidators: true });
        res.status(200).json({ editedCategory });
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.editCategories = editCategories;
const deleteCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        let deleteCategory = yield categoryModel_1.Category.findByIdAndDelete(id);
        res.status(200).json({ deleteCategory });
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.deleteCategories = deleteCategories;
