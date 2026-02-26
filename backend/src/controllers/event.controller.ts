import { Request, Response } from "express";
import db  from "../db/index.js";
import { events } from "../db/schema.js";
import { eq, and } from "drizzle-orm";
import type { User } from "../db/schema.js";


// ========================
// CREATE EVENT
// ========================

export const createEvent = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Event name is required" });
    }

    const user = req.user as User;

    const slug =
      name.toLowerCase().replace(/\s+/g, "-") +
      "-" +
      Math.random().toString(36).substring(2, 6);

    const newEvent = await db
      .insert(events)
      .values({
        name,
        slug,
        organizerId: user.id,
      })
      .returning();

    res.status(201).json(newEvent[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating event" });
  }
};


// ========================
// GET ALL EVENTS (USER ONLY)
// ========================

export const getEvents = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;

    const userEvents = await db
      .select()
      .from(events)
      .where(eq(events.organizerId, user.id));

    res.json(userEvents);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events" });
  }
};


// ========================
// GET SINGLE EVENT (USER ONLY)
// ========================

export const getEventById = async (req: Request, res: Response) => {
  try {
    const id  = req.params.id as string;
    const user = req.user as User;

    const event = await db
      .select()
      .from(events)
      .where(
        and(
          eq(events.id, id),
          eq(events.organizerId, user.id)
        )
      );

    if (!event.length) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event[0]);
  } catch (error) {
    res.status(500).json({ message: "Error fetching event" });
  }
};


// ========================
// DELETE EVENT (USER ONLY)
// ========================

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const id  = req.params.id as string;
    const user = req.user as User;

    const deleted = await db
      .delete(events)
      .where(
        and(
          eq(events.id, id),
          eq(events.organizerId, user.id)
        )
      )
      .returning();

    if (!deleted.length) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event" });
  }
};