import express from "express";
const router = express.Router();

import { create, deleteOne, getAll, getOne, updatePrice } from "../controllers/products";
import { authorize } from "../utils/middlewares/authorize";

router.route("/").get(authorize, getAll);
router.route("/:productId").get(authorize, getOne);
router.route("/").put(authorize, updatePrice);
router.route("/:productId").delete(authorize, deleteOne);
router.route("/").post(authorize, create);

export default router;
