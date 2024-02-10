import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import catergoryRoutes from "./routes/catergoryRoute.js";
import productRoutes from "./routes/productRoutes.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Configure dotenv
dotenv.config();

// Connect to MongoDB
connectDB();

// Create an Express app
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./client/build")));

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", catergoryRoutes);
app.use("/api/v1/product", productRoutes);

// REST API
app.use("*", function () {
  res.sendFile(path.join(__dirname, "./client.build/index.html"));
});

// Port
const PORT = process.env.PORT || 8080;

// Listen
app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
