import { debounce } from "lodash";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

interface ScreenContextObj {
  windowSize: number;
}

const ScreenContext = React.createContext<ScreenContextObj>({
  windowSize: 1080,
});

const ScreenContextProvider: React.FC = (props) => {
  const [windowSize, setWindowSize] = useState(
    (() => {
      if (typeof window === "undefined") return 1080;
      return window.innerWidth;
    })()
  );

  const handleResize = debounce(() => {
    setWindowSize(window.innerWidth);
  }, 100);
  const contextValue: ScreenContextObj = {
    windowSize,
  };

  useEffect(() => {
    // 윈도우 사이즈 계산
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ScreenContext.Provider value={contextValue}>
      {props.children}
    </ScreenContext.Provider>
  );
};

export { ScreenContext, ScreenContextProvider };
