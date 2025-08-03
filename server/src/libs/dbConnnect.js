import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
};