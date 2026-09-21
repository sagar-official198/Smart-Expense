import express from "express";

import { getDashboard } from "../controllers/dashboard.js";

import {
    isAuthenticated,
} from "../middleware/isAuthenticated.js";

const router = express.Router();

router.get(
    "/",
    isAuthenticated,
    getDashboard
);

export default router;