import express from "express";
const app = express();

import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import errorHandler from "./utils/middlewares/errorHandler";
import genericErrorHandler from "./utils/middlewares/genericErrorHandler";

app.use(express.json());

app.use("/users", userRoutes);
app.use("/auth", authRoutes);

app.use(errorHandler);
app.use(genericErrorHandler);

export default app;
