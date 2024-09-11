import React from "react";
import { useNavigate } from "react-router-dom";
import { useDecks } from "../../providers/DeckProvider";
import DeckInput from "./DeckInput";

const StartPage: React.FC = () => {
  const { decks, resetDeck, removeDeck } = useDecks();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Flash Card Decks</h1>
      <DeckInput />
      <ul>
        {decks.map((deck) => {
          const progressPoints = deck.cards
            .filter((card) => !card.archived)
            .reduce((a, c) => (a += Math.max(c.lastRating, 0)), 0);
          const totalPoints =
            deck.cards.filter((card) => !card.archived).length * 4;
          const progressQuotient = progressPoints / totalPoints;
          const progress = progressQuotient * 100;
          const progressString = progress.toFixed(2) + "%";
          console.log({
            progressPoints,
            totalPoints,
            progressQuotient,
            progress,
            progressString,
          });
          return (
            <li
              key={deck.id}
              style={{
                cursor: "pointer",
                display: "flex",
                gap: 5,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <div
                onClick={() => navigate(`/deck/${deck.id}`)}
                style={{
                  border: "1px solid gray",
                  padding: "10px",
                  borderRadius: 12,
                }}
              >
                <img
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "contain",
                    borderRadius: 12,
                    marginRight: "10px",
                  }}
                  src={deck.image}
                  alt={deck.name}
                />
                <div>{deck.name}</div>
                <div>
                  {deck.cards.filter((card) => !card.archived).length} cards
                </div>
                <div>progress:{progressString}</div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 5,
                  flexDirection: "column",
                }}
              >
                <button onClick={() => resetDeck(deck.id)}>reset deck</button>
                <button onClick={() => navigate(`/edit/${deck.id}`)}>
                  edit deck
                </button>
                <button onClick={() => removeDeck(deck.id)}>delete deck</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default StartPage;
