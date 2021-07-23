import type { AppProps } from "next/app";
import React, { useState } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import LightTheme from "../theme/light";
import DarkTheme from "../theme/dark";

const GlobalStyles = createGlobalStyle`
  body{
    background: ${(props) => props.theme.bodyBackgroundColor};
    font-family: 'Source Sans Pro', sans-serif;
    min-height: 100vh;
    margin: 0;
    color: ${(props) => props.theme.bodyFontColor};
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState(LightTheme);
  return (
    <>
      <ThemeProvider
        theme={{
          ...theme,
          setTheme: () => {
            setTheme((s) => (s.id === "light" ? DarkTheme : LightTheme));
          },
        }}
      >
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
export default MyApp;
