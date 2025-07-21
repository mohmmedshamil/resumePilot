import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";
import setupRoutes from "./routes/allRoutes.js";
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // Exit the process with failure
  }
};
const app = express();
config();

app.use(cors());
app.use(json());
connectDB();
setupRoutes(app);
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the API!" });
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});