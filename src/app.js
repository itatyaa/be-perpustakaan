import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import bookRoutes from "./routes/bookRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(bodyParser.json());

// Routes
app.use("/api", userRoutes);
app.use("/api", bookRoutes);
app.use("/api", dashboardRoutes);

export default app;
