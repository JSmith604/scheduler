import { useState } from "react";

const useVisualMode = function(initial) {
  const [mode, setMode] = useState(initial);
  const[history, setHistory] = useState([initial]);

    const transition = function (newMode, replace = false) {
      setMode(newMode)
      if (!replace) {
        setHistory([ ...history, newMode])  
      } else {
        setHistory([...history.slice(0, -1), newMode])
      }
        // setHistory(prev => {
        //   return [...prev, newMode]
        //   setMode(newMode)
    
    
      // function action() {}
      //   return { action };
      }
      
    // });

      const back = function() {
        if (history.length > 1) {
          const previousMode = history[history.length -2]
          setHistory(history.slice(0, -1))
          setMode(previousMode);
        }
        

      // setHistory(prev => {
      //   const newHistory = [...prev];
      //   newHistory.pop();
      //   return newHistory;
      // })
    };
    // const mode = history.slice(-1)[0];
    return {mode, transition, back};
};


export default useVisualMode;