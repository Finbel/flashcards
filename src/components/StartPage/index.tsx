import React from "react";
import { useNavigate } from "react-router-dom";
import { useDecks } from "../../providers/DeckProvider";
import DeckInput from "./DeckInput";

const StartPage: React.FC = () => {
  const { decks, resetDeck } = useDecks();
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
                alignItems: "center",
              }}
            >
              <div onClick={() => navigate(`/deck/${deck.id}`)}>
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
              <button onClick={() => resetDeck(deck.id)}>reset deck</button>
              <button onClick={() => navigate(`/edit/${deck.id}`)}>
                edit deck
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default StartPage;
