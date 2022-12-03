import express from "express";
const router = express.Router();

import { create, getAll } from "../controllers/users";
import { authorize } from "../utils/middlewares/authorize";
import { authorizeRole } from "../utils/middlewares/authorizeRole";

router.post("/", authorize, authorizeRole(1), create);

router.get("/", authorize, authorizeRole(1, 2), getAll);

export default router;
