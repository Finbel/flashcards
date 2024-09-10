import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StartPage from "./components/StartPage";
import FlashCardView from "./components/FlashCardView";
import { DecksProvider } from "./providers/DeckProvider";
import EditDeckView from "./components/EditDeckView/EditDeckView";

const App: React.FC = () => {
  return (
    <DecksProvider>
      <Router>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/deck/:id" element={<FlashCardView />} />
          <Route path="/edit/:id" element={<EditDeckView />} />
        </Routes>
      </Router>
    </DecksProvider>
  );
};

export default App;
