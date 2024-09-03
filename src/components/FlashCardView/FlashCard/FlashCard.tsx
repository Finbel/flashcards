import React, { useState } from "react";
import "./FlashCard.css";
import { Card } from "../../../types";

type Props = {
  card: Card;
  rateAnswer: (answer: 1 | 2 | 3 | 4) => void;
};

const FlashCard: React.FC<Props> = ({ card, rateAnswer }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleCardClick = () => {
    setShowAnswer(true);
  };

  const handleRateClick = (rating: 1 | 2 | 3 | 4) => {
    rateAnswer(rating);
  };

  return (
    <div className="card-container" onClick={handleCardClick}>
      <div className="card-question">{card.question}</div>
      {showAnswer && (
        <>
          <div className="answer-container">
            <div className="card-answer">{card.answer}</div>
          </div>
          <div className="card-buttons">
            <button
              className="card-button card-button-1"
              onClick={() => handleRateClick(1)}
            >
              Very Incorrect
            </button>
            <button
              className="card-button card-button-2"
              onClick={() => handleRateClick(2)}
            >
              Incorrect
            </button>
            <button
              className="card-button card-button-3"
              onClick={() => handleRateClick(3)}
            >
              Correct
            </button>
            <button
              className="card-button card-button-4"
              onClick={() => handleRateClick(4)}
            >
              Very Correct
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FlashCard;
