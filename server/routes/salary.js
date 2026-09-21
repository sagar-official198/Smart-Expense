import express from "express";

import {
    getSalary,
    updateSalary,
} from "../controllers/salary.js";

import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.get("/", isAuthenticated, getSalary);

router.put("/", isAuthenticated, updateSalary);

export default router;