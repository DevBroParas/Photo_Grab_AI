import { Router } from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  deleteEvent,
} from "../controllers/event.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", protect, createEvent);
router.get("/", protect, getEvents);
router.get("/:id", protect, getEventById);
router.delete("/:id", protect, deleteEvent);

export default router;