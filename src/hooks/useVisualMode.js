import { useState } from "react";


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (replace === true) {
      setHistory(prev => {
        return [...prev.slice(0, prev.length - 1), newMode];
      });
    } else {
      setHistory(prev => {
        return [...prev, newMode];
      });
    }
    setMode(newMode);
  };

  const back = () => {
    if (history.length > 1) {
      setHistory(prev => {
        return prev.slice(0, prev.length - 1);
      });
      setMode(history[history.length - 2]);
    }
  };

  console.log(history, mode);

  return {
    mode,
    transition,
    back
  };
}