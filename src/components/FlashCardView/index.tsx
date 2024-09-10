import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDecks } from "../../providers/DeckProvider";
import FlashCard from "./FlashCard/FlashCard";
import { updateCard } from "./updateCard";
import { getNextCards } from "./getNextCards";
import { Card } from "../../types";

const getBackgroundColor = (rating: number) => {
  if (rating === 4) {
    return "#1e90ff";
  }
  if (rating === 3) {
    return "#4dbd74";
  }
  if (rating === 2) {
    return "#ffcc00";
  }
  if (rating === 1) {
    return "#ff6b6b";
  }
  return "#ccc";
};

const FlashCardView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { decks, saveCard } = useDecks();
  const selectedDeck = decks.find((d: { id: string }) => d.id === id);
  const [cardsToGuess, setCardsToGuess] = React.useState<Card[]>([]);
  useEffect(() => {
    if (cardsToGuess.length === 0 && selectedDeck) {
      const cards = getNextCards(
        selectedDeck.cards.filter((card) => !card.archived)
      );
      if (cards) {
        setCardsToGuess(cards);
      }
    }
  }, [cardsToGuess, selectedDeck]);
  if (!selectedDeck) {
    return <div>Loading...</div>;
  }

  const currentCard = cardsToGuess[0];

  if (!currentCard) {
    return <div>No cards to guess</div>;
  }

  const handleNext = (rating: 1 | 2 | 3 | 4) => {
    console.log("Rating", rating);
    const updatedCard = updateCard(currentCard, rating);
    saveCard(selectedDeck.id, updatedCard);
    const newCurrentCards = cardsToGuess.slice(1);
    setCardsToGuess(newCurrentCards);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FlashCard
        key={currentCard.id}
        card={currentCard}
        rateAnswer={handleNext}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          {selectedDeck.cards
            .filter((card) => !card.archived)
            .map((card) => (
              <div
                key={card.id}
                style={{
                  height: 10,
                  width: `${
                    100 /
                    selectedDeck.cards.filter((card) => !card.archived).length
                  }%`,
                  backgroundColor: getBackgroundColor(card.lastRating),
                }}
              />
            ))}
        </div>
        <p>Cards until reset: {cardsToGuess.length}</p>
      </div>
    </div>
  );
};

export default FlashCardView;
