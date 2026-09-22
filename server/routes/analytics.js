import express from "express";

import {
    getAnalytics,
} from "../controllers/analytics.js";

import {
    isAuthenticated,
} from "../middleware/isAuthenticated.js";

const router = express.Router();

router.get(
    "/",
    isAuthenticated,
    getAnalytics
);

export default router;