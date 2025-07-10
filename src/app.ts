import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./router/shopRoutes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:4000", "https://tech-commerce-red.vercel.app/"],
    credentials: true,
  })
);
app.use(cookieParser());

// Routes
app.use("/api/account", router);

export default app;
