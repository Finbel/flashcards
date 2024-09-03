import { z } from "zod";
import { cardSchema, protoCardSchema } from "./cards";

export const protoDeckSchema = z.object({
  name: z.string(),
  image: z.string(),
  cards: z.array(protoCardSchema),
});

export type ProtoDeck = z.infer<typeof protoDeckSchema>;

export const parseDeckInput = (deck: unknown): ProtoDeck => {
  try {
    return protoDeckSchema.parse(deck);
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.log(err.issues);
    }
    throw err;
  }
};

export const deckSchema = protoDeckSchema.omit({ cards: true }).extend({
  id: z.string(),
  cards: z.array(cardSchema),
});

export type Deck = z.infer<typeof deckSchema>;
