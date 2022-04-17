import express from "express";
const router = express.Router();

import { login } from "../controllers/auth";

router.route("/").post(login);

export default router;
