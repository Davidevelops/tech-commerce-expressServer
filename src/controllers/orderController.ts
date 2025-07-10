import { Request, Response, NextFunction } from "express";
import { Order } from "../model/orderModel";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

interface JwtPayload {
  id: string;
}

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ orders });
  } catch (error) {
    console.log(error);
  }
};

export const getUserOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies.jwt;

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;
    const userId = new mongoose.Types.ObjectId(decoded.id);

    const orders = await Order.find({ userId });
    res.status(200).json({
      orders,
    });
  } catch (error: unknown) {
    console.error("Error fetching user orders:", error);
    next(error);
  }
};

export const submitOrder = async (req: Request, res: Response) => {
  const token = req.cookies.jwt;
  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const decoded: any = jwt.verify(token, process.env.SECRET_KEY as string);
    const userId = decoded.id;

    const {
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
    } = req.body;

    if (!orderName || !orderQuantity || !orderPrice || !total) {
      res.status(400).json({ error: "Missing required order fields" });
      return;
    }

    const newOrder = new Order({
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

    await newOrder.save();
    res.status(201).json({ newOrder });
  } catch (error) {
    console.error(error);

    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ error: "Invalid or expired token" });
    } else if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
