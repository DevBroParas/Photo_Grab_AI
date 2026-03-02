import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { users } from "../db/schema.js";
import db from "../db/index.js";
import { and, eq } from "drizzle-orm";
import { comparePassword, hashPassword } from "../utils/hash_password.js";


export const generateToken = (user: any) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );
};

export const authCallback = (req: Request, res: Response) => {
  const user = req.user as any;

  const token = generateToken(user);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  res.redirect("http://localhost:5173/dashboard");
};

export const getCurrentUser = (req: Request, res: Response) => {
  res.json(req.user);
};

export const register = async (req: Request, res: Response) => {
  try {
    let { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required"
      });
    }

    email = email.toLowerCase().trim();

    const existingUser = await db
      .select()
      .from(users)
      .where(
        and(
          eq(users.email, email),
          eq(users.provider, "local")
        )
      );

    if (existingUser.length > 0) {
      return res.status(409).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await db
      .insert(users)
      .values({
        name,
        email,
        password: hashedPassword,
        provider: "local",
        providerId: email,
      })
      .returning();

    const token = generateToken(user[0]);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User created successfully",
      user: user[0],
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    let { email, password } = req.body;


    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    email = email.toLowerCase().trim();


    const user = await db
      .select()
      .from(users)
      .where(
        and(
          eq(users.email, email),
          eq(users.provider, "local")
        )
      );

    if (user.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await comparePassword(password, user[0].password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user[0]);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user[0].id,
        name: user[0].name,
        email: user[0].email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (_req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  res.json({ message: "Logged out" });
};