import type { AppProps } from "next/app";
import React, { useContext, useEffect, useState } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import LightTheme from "../theme/light";
import DarkTheme from "../theme/dark";
import { AuthContext, AuthContextProvider } from "../store/AuthContext";
import { CookiesProvider } from "react-cookie";
import {
  Provider as AlertProvider,
  AlertComponentPropsWithStyle,
} from "react-alert";
import { AlertMessage } from "../components/common";

const GlobalStyles = createGlobalStyle`
@font-face {
    font-family: 'BMJUA';
    src: url('/fonts/BMJUA_ttf.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}
  body{
    background: ${(props) => props.theme.bodyBackgroundColor};
    font-family: "BMJUA";
    min-height: 100vh;
    margin: 0;
    color: ${(props) => props.theme.bodyFontColor};
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState(LightTheme);
  const AlertTemplate: React.FC<AlertComponentPropsWithStyle> = ({
    message,
    close,
    options,
  }) => {
    return (
      <AlertMessage message={message} onClick={close} type={options.type}>
        {/* {options.type === "info" && "!"}
      {options.type === "success" && ":)"}
      {options.type === "error" && ":("} */}
      </AlertMessage>
    );
  };

  return (
    <CookiesProvider>
      <ThemeProvider
        theme={{
          ...theme,
          setTheme: () => {
            setTheme((s) => (s.id === "light" ? DarkTheme : LightTheme));
          },
        }}
      >
        <AlertProvider template={AlertTemplate}>
          <GlobalStyles />
          <AuthContextProvider>
            <Component {...pageProps} />
          </AuthContextProvider>
        </AlertProvider>
      </ThemeProvider>
    </CookiesProvider>
  );
}
export default MyApp;
