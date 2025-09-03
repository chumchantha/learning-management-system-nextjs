import {
  pgTable,
  text,
  timestamp,
  boolean,
  pgEnum,
  uuid,
  varchar,
  integer,
} from "drizzle-orm/pg-core";

// Enums for Better Auth
export const roleEnum = pgEnum("role", ["USER", "ADMIN", "MODERATOR"]);

// Courses enum
export const CourseLevelEnum = pgEnum("courseLevel", [
  "BEGINNER",
  "INTERMEDIATE",
  "ADVANCED",
]);

// Users table (Better Auth compatible)
export const user = pgTable("user", {
  id: varchar("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(), //nickname
  username: varchar("username", { length: 50 }).unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: boolean("emailVerified").notNull().default(false),
  image: varchar("image", { length: 255 }),
  role: roleEnum("role").default("USER").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

// Sessions table (Better Auth compatible)
export const session = pgTable("session", {
  id: varchar("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  token: varchar("token").notNull().unique(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  ipAddress: varchar("ipAddress", { length: 45 }),
  userAgent: text("userAgent"),
  userId: varchar("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

// Accounts table (Better Auth compatible for OAuth)
export const account = pgTable("account", {
  id: varchar("id").primaryKey(),
  accountId: varchar("accountId").notNull(),
  providerId: varchar("providerId").notNull(),
  userId: varchar("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
  refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
  scope: varchar("scope", { length: 255 }),
  password: varchar("password", { length: 255 }),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

// Verification table (Better Auth compatible)
export const verification = pgTable("verification", {
  id: varchar("id").primaryKey(),
  identifier: varchar("identifier").notNull(),
  value: varchar("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

// Courses table
export const course = pgTable("course", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  description: varchar("description", { length: 1000 }).notNull(),
  fileKey: text("fileKey").notNull(),
  price: integer("price").notNull(),
  level: CourseLevelEnum("level").notNull().default("BEGINNER"),
  category: varchar("category", { length: 255 }).notNull(),
  smallDescription: varchar("smallDescription", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

//Type
export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
export type Session = typeof session.$inferSelect;
export type Account = typeof account.$inferSelect;
