import { useState } from "react";

// tracks and updates current view mode of appointment & history of modes.

export default function useVisualMode(initialMode) {
  const [history, setHistory] = useState([initialMode])
  
  const transition = (newMode, replace = false) => {
    if (replace) {
      setHistory(history.slice(0, history.length-1))
    }
      setHistory(prev => [...prev, newMode]);
  };

  function back() {
   if (history.length > 1) { 

    setHistory(history.slice(0, history.length-1))
    
    }
   }

   return { mode: history[history.length-1], transition, back }
}