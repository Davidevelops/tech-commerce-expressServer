import mongoose, { Document, Schema } from "mongoose";

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  orderName: string[];
  orderQuantity: string[];
  orderPrice: string[];
  street: string;
  barangay: string;
  city: string;
  province: string;
  total: string;
  recipientName: string;
  recipientContact: string;
}

const OrderSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "account",
      required: true,
    },
    orderName: [String],
    orderQuantity: [String],
    orderPrice: [String],
    street: String,
    barangay: String,
    city: String,
    province: String,
    total: String,
    recipientName: String,
    recipientContact: String,
  },
  { timestamps: true }
);

export const Order = mongoose.model<IOrder>("order", OrderSchema, "orders");
