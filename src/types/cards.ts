import { z } from "zod";

export const protoCardSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

// Define the Zod schema for the Card type
export const cardSchema = protoCardSchema.extend({
  question: z.string(),
  answer: z.string(),
  id: z.string(),
  reviewCount: z.number(),
  correctCount: z.number(),
  lastReviewDate: z.string(),
  lastRating: z.number(),
});

// Define the TypeScript type for the parsed data
export type ProtoCard = z.infer<typeof protoCardSchema>;
// Define the TypeScript type for the parsed data
export type Card = z.infer<typeof cardSchema>;

// Function to parse and validate a Card object
export function parseCardInput(card: unknown): ProtoCard {
  return protoCardSchema.parse(card);
}
