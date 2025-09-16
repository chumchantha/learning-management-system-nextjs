import { z } from "zod";

// Courses enum
export const courseLevel = ["BEGINNER", "INTERMEDIATE", "ADVANCED"] as const;
export const courseStatus = ["DRAFT", "PUBLISHED", "ARCHIVED"] as const;
export const courseCategory = [
  "Frontend",
  "Backend",
  "Nextjs",
  "Vue",
  "Nuxtjs",
  "Spring Boot",
] as const;

export const courseSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(255, { message: "Title must be less than 255 characters" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(1000, { message: "Description must be less than 1000 characters" }),
  fileKey: z.string().min(1, { message: "File key is required" }),
  price: z
    .number()
    .min(1, { message: "Price is required" })
    .max(10000, { message: "Price must be less than 1000000" }),
  duration: z.number().min(1).max(500),
  level: z.enum(courseLevel),
  status: z.enum(courseStatus),
  category: z.enum(courseCategory, { message: "Category is required" }),
  smallDescription: z
    .string()
    .min(1, { message: "Small description is required" })
    .max(255, {
      message: "Small description must be less than 255 characters",
    }),
  slug: z
    .string()
    .min(1, { message: "Slug is required" })
    .max(255, { message: "Slug must be less than 255 characters" }),
});

export type CourseSchemaType = z.infer<typeof courseSchema>;
