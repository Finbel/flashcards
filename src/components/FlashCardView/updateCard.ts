import { Card } from "../../types";

export function updateCard(card: Card, rating: number): Card {
  const now = new Date().toISOString();
  const reviewCount = card.reviewCount + 1;
  const correctCount = card.correctCount + (rating >= 3 ? 1 : 0);
  const lastRating = rating;
  const lastReviewDate = now;
  const newCard = {
    ...card,
    reviewCount,
    correctCount,
    lastRating,
    lastReviewDate,
  };
  return newCard;
}
