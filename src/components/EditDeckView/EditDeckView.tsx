import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { useDecks } from "../../providers/DeckProvider";

const EditDeckView: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { decks, saveCard } = useDecks();
  const [filter, setFilter] = useState("");
  const selectedDeck = decks.find((d: { id: string }) => d.id === id);
  if (!selectedDeck) {
    return <div>Deck not found</div>;
  }
  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 4, padding: 10 }}
    >
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      {selectedDeck.cards
        .filter(
          (card) =>
            !filter ||
            card.question.toLowerCase().includes(filter.toLowerCase())
        )
        .map((card) => {
          return (
            <div key={card.id} style={{ display: "flex" }}>
              <button
                style={{
                  padding: "5px 10px",
                  alignSelf: "center",
                }}
                onClick={() =>
                  saveCard(selectedDeck.id, {
                    ...card,
                    archived: !card.archived,
                  })
                }
              >
                {card.archived ? "unarchive" : "archive"}
              </button>
              <p
                style={{
                  margin: 0,
                }}
              >
                {card.question}
              </p>
            </div>
          );
        })}
    </div>
  );
};

export default EditDeckView;
