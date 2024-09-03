import { FC, useState } from "react";
import { useDecks } from "../../providers/DeckProvider";
import { parseDeck } from "./parseDeck";

const DeckInput: FC = () => {
  const { addDeck } = useDecks();
  const [value, setValue] = useState<string>("");
  const handleSave = () => {
    try {
      const unparsedDeck = JSON.parse(value);
      const deck = parseDeck(unparsedDeck);
      addDeck(deck);
    } catch (err: unknown) {
      console.error("Invalid JSON file", err);
    }
  };
  return (
    <div>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter deck JSON here"
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default DeckInput;
