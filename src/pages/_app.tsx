import type { AppProps } from "next/app";
import React, { useState } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import LightTheme from "../theme/light";
import DarkTheme from "../theme/dark";
import { AuthContextProvider } from "../store/AuthContext";
import { CookiesProvider } from "react-cookie";
import {
  transitions,
  positions,
  Provider as AlertProvider,
  AlertComponentPropsWithStyle,
} from "react-alert";
import {
  Message,
  MessageConfirmButton,
  MessageBox,
} from "../components/common";

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
    style,
    options,
  }) => (
    <>
      <Message
        style={style}
        message={message}
        onClick={close}
        type={options.type}
      >
        {/* {options.type === "info" && "!"}
      {options.type === "success" && ":)"}
      {options.type === "error" && ":("} */}
      </Message>
    </>
  );

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
