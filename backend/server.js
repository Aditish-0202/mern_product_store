import express from "express";
import dotenv from "dotenv";


import { connectDB } from "./config/db.js";

import cors from "cors";

//App.use(cors()); // allow all origins (for now)


import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;



app.use(express.json()); // allows us to accept JSON data in the req.body

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Server started at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect DB:", error);
    process.exit(1); // stop app if DB fails
  }
};

startServer();
