import { useEffect, useRef } from "react";
function App() {
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  useEffect(() => {
    timerRef.current = setInterval(() => {
      console.log("1");
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);
  return <>this is div</>;
}

export default App;
