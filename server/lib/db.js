import mongoose from "mongoose";
import dns from "dns";

// Try setting reliable DNS servers for SRV resolution if default fails
try {
    dns.setServers(["1.1.1.1", "8.8.8.8"]);
} catch (e) {
    // Ignore error if custom DNS cannot be set
}

// Function to connect to MongoDB
export const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log("Database Connected"));
        await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);
        if (error.name === "MongooseServerSelectionError") {
            console.error("\n💡 Troubleshooting Tips:");
            console.error("1. Ensure your IP address is whitelisted in MongoDB Atlas (Network Access -> Add IP Address -> 0.0.0.0/0).");
            console.error("2. Check your internet connection or active VPN/Firewall blocking port 27017.\n");
        }
    }
};