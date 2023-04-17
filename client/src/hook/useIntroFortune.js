import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function useIntroFortune() {
  const [isFortuneReady, setIsFortuneReady] = useState(false);

  const date = useSelector((state) => state.date.date);

  useEffect(() => {
    if (date.day !== "") {
      console.log("???")
      setIsFortuneReady(true);
    }
  }, [date]);

  return { isFortuneReady };
}

export default useIntroFortune;
