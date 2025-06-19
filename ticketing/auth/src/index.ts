import mongoose from "mongoose";
import { app } from "./app";
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("Jwt not found");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MongoUri not found");
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }

  app.listen(3000, () => {
    console.log("listening to port 3000  !!!");
  });
};
start();
