import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import db from "../db/index.js"
import { users } from "../db/schema.js";
import { eq } from "drizzle-orm";
import "dotenv/config";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/api/auth/google/callback",
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const existingUser = await db
          .select()
          .from(users)
          .where(eq(users.email, profile.emails![0].value));

        if (existingUser.length) {
          return done(null, existingUser[0]);
        }

        const newUser = await db
          .insert(users)
          .values({
            name: profile.displayName,
            email: profile.emails![0].value,
            provider: "google",
            providerId: profile.id,
          })
          .returning();

        return done(null, newUser[0]);
      } catch (err) {
        return done(err, undefined);
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: "/api/auth/github/callback",
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;

        if (!email) {
          return done(new Error("No email from GitHub"), undefined);
        }

        const existingUser = await db
          .select()
          .from(users)
          .where(eq(users.email, email));

        if (existingUser.length) {
          return done(null, existingUser[0]);
        }

        const newUser = await db
          .insert(users)
          .values({
            name: profile.displayName || profile.username!,
            email,
            provider: "github",
            providerId: profile.id,
          })
          .returning();

        return done(null, newUser[0]);
      } catch (err) {
        return done(err, undefined);
      }
    }
  )
);

export default passport;