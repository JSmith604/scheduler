
const useVisualMode = function(initial) {
  const [mode, setMode] = useState(initial);
  const[history, setHistory] = useState([initial]);

    const transtion = function (newMode) {
      
      setHistory(prev => {
        return [...prev, newMode]
      })

     
    };
    const back = function() {
      
      setHistory(prev => {
        const newHistory = [...prev];
        newHistory.pop();
        return newHistory;
      })
    };
    const mode = history.slice(-1)[0];
    return {mode, transtion, back};
};

export default useVisualMode;