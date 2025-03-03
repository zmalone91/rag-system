import { pgTable, text, serial, timestamp, varchar, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  category: text("category").notNull(),
  demoUrl: text("demo_url"),
  githubUrl: text("github_url"),
  techStack: text("tech_stack").array().notNull()
});

export const projectDemos = pgTable("project_demos", {
  id: serial("id").primaryKey(),
  projectId: serial("project_id").references(() => projects.id),
  name: text("name").notNull(),
  description: text("description").notNull(),
  config: jsonb("config").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  publishDate: timestamp("publish_date").notNull()
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});

// Demo-specific schemas
export const ragQuerySchema = z.object({
  query: z.string().min(1, "Query is required"),
  context: z.string().optional()
});

export const insertContactSchema = createInsertSchema(contactMessages).omit({ 
  id: true,
  createdAt: true 
});

export type Project = typeof projects.$inferSelect;
export type ProjectDemo = typeof projectDemos.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type RagQuery = z.infer<typeof ragQuerySchema>;