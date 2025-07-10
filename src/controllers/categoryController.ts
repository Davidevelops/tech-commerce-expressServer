import { Request, Response } from "express";
import { Category } from "../model/categoryModel";

export const getCategories = async (req: Request, res: Response) => {
  try {
    let categories = await Category.find().populate("parent");
    res.status(200).json({ categories });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    let category = await Category.findById(id).populate("parent");
    res.status(200).json({ category });
  } catch (error) {
    res.status(400).json({ error });
  }
};
export const addCategories = async (req: Request, res: Response) => {
  const { name, parent, properties } = req.body;

  try {
    const newCategory = new Category({
      name,
      parent,
      properties,
    });

    await newCategory.save();
    res.status(201).json({ newCategory });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const editCategories = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, parent, properties } = req.body;

  try {
    let editedCategory = await Category.findByIdAndUpdate(
      id,
      { name, parent, properties },
      { new: true, runValidators: true }
    );
    res.status(200).json({ editedCategory });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const deleteCategories = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    let deleteCategory = await Category.findByIdAndDelete(id);
    res.status(200).json({ deleteCategory });
  } catch (error) {
    res.status(400).json({ error });
  }
};
