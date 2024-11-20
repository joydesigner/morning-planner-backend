import dotenv from "dotenv";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import cors from "cors";
import {schema} from "./graphql/schema";

dotenv.config();

// Validate Environment Variables
if (!process.env.MONGO_URI) {
    console.error("Error: MONGO_URI is not defined in the environment variables.");
    process.exit(1);
}
if (!process.env.PORT) {
    console.error("Error: PORT is not defined in the environment variables.");
}

// Create Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Endpoint
app.get("/healthcheck", (req, res) => {
    res.status(200).json({ status: "OK", message: "Server is healthy" });
});

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => {
        console.error("MongoDB Connection Error:", err);
        process.exit(1); // Exit process if connection fails
    });

// GraphQL Endpoint
app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true, // Enable GraphiQL in development
    })
);

// Start the Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}/graphql`)
);

// Graceful Shutdown
const shutdown = async () => {
    console.log("Shutting down gracefully...");
    await mongoose.disconnect();
    process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

// Uncaught Exception and Rejection Handlers
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
});