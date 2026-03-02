import { Router } from "express";
import passport from "./passport.js";
import { authCallback, logout, getCurrentUser, register, login } from "./auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  authCallback
);

router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));
router.get(
  "/github/callback",
  passport.authenticate("github", { session: false }),
  authCallback
);

router.post("/register", register)
router.post("/login", login)

router.post("/logout", logout);
router.get("/me", protect, getCurrentUser);

export default router;