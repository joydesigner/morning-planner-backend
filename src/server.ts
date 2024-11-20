import dotenv from "dotenv";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import cors from "cors";
import schema from "./schemas";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection Error:", err));

// GraphQL Endpoint
app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}/graphql`));