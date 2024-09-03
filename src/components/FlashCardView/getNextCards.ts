import { Card } from "../../types";

const sortFunction = (a: Card, b: Card) => {
  // lowest rating first
  const byLastRating = a.lastRating - b.lastRating;
  const accuracyA = a.correctCount / a.reviewCount;
  const accuracyB = b.correctCount / b.reviewCount;
  // lowest accuracy first
  const byAccuracy = accuracyA - accuracyB;
  // lowest review count first
  const byReviewCount = a.reviewCount - b.reviewCount;
  return byLastRating || byAccuracy || byReviewCount;
};

export function getNextCards(cards: Card[]): Card[] | null {
  if (cards.length === 0) {
    return null;
  }

  // Sort cards by priority (lowest priority first)
  const sortedCards = [...cards].sort(sortFunction);

  const tenHighestPriorityCards = sortedCards.slice(0, 10);

  return tenHighestPriorityCards.sort((a, b) => {
    return (
      new Date(a.lastReviewDate).getTime() -
      new Date(b.lastReviewDate).getTime()
    );
  });
}
