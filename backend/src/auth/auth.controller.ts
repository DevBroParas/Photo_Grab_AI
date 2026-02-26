import { Request, Response } from "express";
import jwt from "jsonwebtoken";

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
    secure: false, // true in production
    sameSite: "lax",
  });

  res.redirect("http://localhost:5173/dashboard");
// res.json({
//   message: "Login successful",
//   user,
// });
};

export const logout = (_req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};

export const getCurrentUser = (req: Request, res: Response) => {
  res.json(req.user);
};