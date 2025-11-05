// routes/enrollmentRoutes.js
import express from "express";
import { approveEnrollment, getAllEnrollments } from "../controllers/enrollmentController.js";

const router = express.Router();

router.get("/", getAllEnrollments);
router.put("/:id/approved", approveEnrollment);

export default router;
