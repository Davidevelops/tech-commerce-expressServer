import { Response, Request } from "express";
import { Product } from "../model/productModel";

const errorHandler = async (error: any) => {
  const errors: { [key: string]: string } = {
    productName: "",
    productDescription: "",
    productPrice: "",
    productCategory: "",
    productSubCategory: "",
  };

  if (error.message.includes("Product validation failed")) {
    Object.values(error.errors).forEach((error: any) => {
      const { properties } = error;

      if (properties && properties.path && properties.message) {
        errors[properties.path] = properties.message;
      } else {
        console.log("Unexpected validation error format:", error);
      }
    });
  }

  return errors;
};

export const addProduct = async (req: Request, res: Response) => {
  try {
    const {
      productName,
      productDescription,
      productPrice,
      productImages,
      productCategory,
      productSubCategory,
      properties,
    } = req.body;

    const newProduct = new Product({
      productName,
      productDescription,
      productPrice,
      productImages,
      productCategory,
      productSubCategory,
      properties,
    });

    await newProduct.save();

    res.status(200).json({ newProduct });
  } catch (error) {
    let errors = await errorHandler(error);
    res.status(400).json({ errors });
    console.log(error);
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
  }
};

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(200).json({ product });
  } catch (error) {
    console.error(error);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    productName,
    productDescription,
    productPrice,
    productImages,
    productCategory,
    productSubCategory,
    properties,
  } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        productName,
        productDescription,
        productPrice,
        productImages,
        productCategory,
        productSubCategory,
        properties,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({ updatedProduct });
  } catch (error) {
    let errors = await errorHandler(error);
    res.status(400).json({ errors });
    console.log(error);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const products = await Product.findByIdAndDelete(id);
    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
  }
};

export const getNewArrivals = async (req: Request, res: Response) => {
  try {
    const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(7);
    res.status(200).json({ newArrivals });
  } catch (error) {
    console.log(error);
  }
};
export const getMobile = async (req: Request, res: Response) => {
  try {
    const mobile = await Product.find({ productCategory: "mobile" });
    res.status(200).json({ mobile });
  } catch (error) {
    console.log(error);
  }
};

export const getLaptop = async (req: Request, res: Response) => {
  try {
    const laptop = await Product.find({ productCategory: "laptop" });
    res.status(200).json({ laptop });
  } catch (error) {
    console.log(error);
  }
};

export const getTablet = async (req: Request, res: Response) => {
  try {
    const tablet = await Product.find({ productCategory: "tablet" });
    res.status(200).json({ tablet });
  } catch (error) {
    console.log(error);
  }
};

export const getConsole = async (req: Request, res: Response) => {
  try {
    const console = await Product.find({ productCategory: "gaming_console" });
    res.status(200).json({ console });
  } catch (error) {
    console.log(error);
  }
};

export const getWearable = async (req: Request, res: Response) => {
  try {
    const wearable = await Product.find({ productCategory: "wearable" });
    res.status(200).json({ wearable });
  } catch (error) {
    console.log(error);
  }
};
