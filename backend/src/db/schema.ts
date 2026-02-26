import {
  pgTable,
  uuid,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";




export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  provider: text("provider").notNull(), // google | github
  providerId: text("provider_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});




export const events = pgTable("events", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),

  organizerId: uuid("organizer_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  createdAt: timestamp("created_at").defaultNow(),
});




export const photos = pgTable("photos", {
  id: uuid("id").defaultRandom().primaryKey(),

  eventId: uuid("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),

  imageUrl: text("image_url").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});




export const faces = pgTable("faces", {
  id: uuid("id").defaultRandom().primaryKey(),

  eventId: uuid("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),

  faceKey: text("face_key").notNull(), // returned by AI
  thumbnailUrl: text("thumbnail_url"),

  createdAt: timestamp("created_at").defaultNow(),
});




export const facePhotos = pgTable("face_photos", {
  id: uuid("id").defaultRandom().primaryKey(),

  faceId: uuid("face_id")
    .notNull()
    .references(() => faces.id, { onDelete: "cascade" }),

  photoId: uuid("photo_id")
    .notNull()
    .references(() => photos.id, { onDelete: "cascade" }),
});





export const usersRelations = relations(users, ({ many }) => ({
  events: many(events),
}));

export const eventsRelations = relations(events, ({ one, many }) => ({
  organizer: one(users, {
    fields: [events.organizerId],
    references: [users.id],
  }),
  photos: many(photos),
  faces: many(faces),
}));

export const photosRelations = relations(photos, ({ one, many }) => ({
  event: one(events, {
    fields: [photos.eventId],
    references: [events.id],
  }),
  facePhotos: many(facePhotos),
}));

export const facesRelations = relations(faces, ({ one, many }) => ({
  event: one(events, {
    fields: [faces.eventId],
    references: [events.id],
  }),
  facePhotos: many(facePhotos),
}));

export const facePhotosRelations = relations(facePhotos, ({ one }) => ({
  face: one(faces, {
    fields: [facePhotos.faceId],
    references: [faces.id],
  }),
  photo: one(photos, {
    fields: [facePhotos.photoId],
    references: [photos.id],
  }),
}));

export type User = typeof users.$inferSelect;