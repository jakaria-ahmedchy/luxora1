import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters"),

  price: z.number().positive(),

  discountPrice: z.number().optional(),

  stock: z.number().int().nonnegative(),

  category: z.string().min(2),

  images: z.array(z.string()).optional(),

  brand: z.string().optional(),

  featured: z.boolean().optional(),
});

export type ProductInput = z.infer<typeof productSchema>;