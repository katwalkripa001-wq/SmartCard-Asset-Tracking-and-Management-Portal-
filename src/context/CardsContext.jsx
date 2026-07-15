import { createContext, useContext, useEffect, useState } from "react";
import { seedCards, seedLogs } from "../data/seedCards";

const CardsContext = createContext(null);
const CARDS_KEY = "scms_cards";
const LOGS_KEY = "scms_logs";

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function CardsProvider({ children }) {
  const [cards, setCards] = useState(() => loadFromStorage(CARDS_KEY, seedCards));
  const [logs, setLogs] = useState(() => loadFromStorage(LOGS_KEY, seedLogs));

  useEffect(() => {
    localStorage.setItem(CARDS_KEY, JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
  }, [logs]);

  function addCard(card) {
    setCards((prev) => [...prev, card]);
  }

  function updateCard(id, updates) {
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  }

  function deleteCard(id) {
    setCards((prev) => prev.filter((c) => c.id !== id));
  }

  function addLog(log) {
    setLogs((prev) => [log, ...prev]);
  }

  return (
    <CardsContext.Provider value={{ cards, addCard, updateCard, deleteCard, logs, addLog }}>
      {children}
    </CardsContext.Provider>
  );
}

export function useCards() {
  const ctx = useContext(CardsContext);
  if (!ctx) throw new Error("useCards must be used inside CardsProvider");
  return ctx;
}
