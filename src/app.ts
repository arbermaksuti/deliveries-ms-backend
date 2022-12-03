import express from "express";
const app = express();

import errorHandler from "./utils/middlewares/errorHandler";
import genericErrorHandler from "./utils/middlewares/genericErrorHandler";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import productsRoutes from "./routes/products";

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);

app.use(errorHandler);
app.use(genericErrorHandler);

export default app;
