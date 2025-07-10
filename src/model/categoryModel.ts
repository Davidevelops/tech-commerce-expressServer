import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
}
export interface IProperty {
  name: string;
  value: string;
}
const categorySchema: Schema = new Schema({
  name: { type: String, required: true },
  parent: { type: mongoose.Types.ObjectId, ref: "Category" },
  properties: [
    {
      name: { type: String },
      value: { type: String },
    },
  ],
});

export const Category = mongoose.model<ICategory>(
  "Category",
  categorySchema,
  "categories"
);
