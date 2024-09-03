import React, { createContext, useContext, useEffect, useState } from "react";
import { Card } from "../types";

type Deck = {
  name: string;
  image: string;
  id: string;
  cards: Card[];
};

type Context = {
  decks: Deck[];
  addDeck: (deck: Deck) => void;
  deleteDeck: (id: string) => void;
  saveCard: (deckId: string, card: Card) => void;
};

// Create the context with a default value (which can be null)
const DecksContext = createContext<Context | undefined>(undefined);

export const DecksProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [decks, setDecks] = useState<Deck[]>([]);

  useEffect(() => {
    // Load the deck from local storage
    const storedDecks = JSON.parse(localStorage.getItem("decks") || "[]");
    if (storedDecks) {
      setDecks(storedDecks);
    }
  }, []);

  const addDeck = (deck: Deck) => {
    setDecks((prevDecks) => [...prevDecks, deck]);
    localStorage.setItem("decks", JSON.stringify([...decks, deck]));
  };

  const deleteDeck = (id: string) => {
    setDecks((prevDecks) => prevDecks.filter((deck) => deck.id !== id));
    localStorage.setItem(
      "decks",
      JSON.stringify(decks.filter((deck) => deck.id !== id))
    );
  };

  const saveCard = (deckId: string, updatedCard: Card) => {
    const newDecks = decks.map((deck) => {
      if (deck.id === deckId) {
        return {
          ...deck,
          cards: deck.cards.map((card) =>
            card.id === updatedCard.id ? updatedCard : card
          ),
        };
      }
      return deck;
    });

    setDecks(newDecks);
    localStorage.setItem("decks", JSON.stringify(newDecks));
  };

  return (
    <DecksContext.Provider value={{ decks, addDeck, deleteDeck, saveCard }}>
      {children}
    </DecksContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDecks = (): Context => {
  const context = useContext(DecksContext);
  if (context === undefined) {
    throw new Error("useDecks must be used within a DecksProvider");
  }
  return context;
};
