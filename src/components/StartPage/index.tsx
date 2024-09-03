import React from "react";
import { useNavigate } from "react-router-dom";
import { useDecks } from "../../providers/DeckProvider";
import DeckInput from "./DeckInput";

const StartPage: React.FC = () => {
  const { decks } = useDecks();
  const navigate = useNavigate();

  const handleDeckClick = (id: string) => {
    navigate(`/deck/${id}`);
  };

  return (
    <div>
      <h1>Flash Card Decks</h1>
      <DeckInput />
      <ul>
        {decks.map((deck) => (
          <li
            key={deck.id}
            onClick={() => handleDeckClick(deck.id)}
            style={{
              cursor: "pointer",
            }}
          >
            <div>
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
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StartPage;
