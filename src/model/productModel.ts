import mongoose, { Schema, Document } from "mongoose";
import { Category } from "./categoryModel";

export interface IProduct extends Document {
  productName: string;
  productDescription: string;
  productPrice: number;
  productImages: string[];
  productCategory: string;
  productSubCategory: string;
}

const productSchema: Schema = new Schema(
  {
    productName: {
      type: String,
      required: [true, "Please provide the name for this product."],
    },
    productDescription: {
      type: String,
      required: [true, "Please provide a description for this product."],
    },
    productPrice: {
      type: Number,
      required: [true, "Please provide a price for this product."],
    },
    productImages: {
      type: [String],
    },
    productCategory: {
      type: String,
      required: [true, "Please categorized the product."],
    },
    productSubCategory: {
      type: String,
    },
    properties: [
      {
        name: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>(
  "Product",
  productSchema,
  "products"
);
