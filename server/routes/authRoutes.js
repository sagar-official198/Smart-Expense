import express from "express";

import { login } from "../controllers/login.js";
import { signup } from "../controllers/signup.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

export default router;