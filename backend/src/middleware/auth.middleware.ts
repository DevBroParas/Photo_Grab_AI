import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import  db  from "../db/index.js";
import { users } from "../db/schema.js";
import { eq } from "drizzle-orm";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, decoded.id));

    if (!user.length) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user[0];
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};