import mongoose from "mongoose";
import dns from "dns";

try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch (e) {
    // Ignore error if custom DNS cannot be set
}

// Function to connect the mongoose
export const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log("Database Connected"));
        await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        console.log("MongoDB Connection Error:", error);
    }
}