import { v4 as uuidv4 } from "uuid";
import { Card, Deck, parseDeckInput, ProtoCard } from "../../types";

const createCard = (cardInput: ProtoCard): Card => {
  return {
    id: uuidv4(),
    question: cardInput.question,
    answer: cardInput.answer,
    reviewCount: 0,
    correctCount: 0,
    lastReviewDate: new Date().toISOString(),
    lastRating: -1,
  };
};
export const parseDeck = (deckInput: unknown): Deck => {
  const deck = parseDeckInput(deckInput);
  return {
    ...deck,
    id: uuidv4(),
    cards: deck.cards.map(createCard),
  };
};
