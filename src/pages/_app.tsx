import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import LightTheme from "../theme/light";
import DarkTheme from "../theme/dark";
import { AuthContextProvider } from "../store/AuthContext";
import { AlertMessage } from "../components/common";
import { DefaultSeo } from "next-seo";
import { ChatContextProvider } from "../store/ChatContext";
import { avoidLocalStorageUndefined } from "../utils";
import store, { wrapper } from "../store";
import { Provider, useDispatch } from "react-redux";
import Errorboundary from "../components/common/Errorboundary";
import { useAppSelector } from "../hooks/redux";
import ChatWrapper from "../components/common/ChatWrapper";

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

  useEffect(() => {
    setTheme(
      avoidLocalStorageUndefined("displayMode", "light") === "light"
        ? LightTheme
        : DarkTheme
    );
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider
        theme={{
          ...theme,
          setTheme: () => {
            setTheme((s) => (s.id === "light" ? DarkTheme : LightTheme));
          },
        }}
      >
        <Errorboundary>
          <GlobalStyles />
          <AuthContextProvider>
            {/* <ChatWrapper> */}
            <ChatContextProvider>
              <DefaultSeo
                title={"ChawChaw 언어를 교환합시다.🗣"}
                description={
                  "대학내 교환학생 언어교환 채팅 어플리케이션입니다."
                }
                canonical="https://www.chawchaw.vercel.app"
                openGraph={{
                  type: "website",
                  locale: "en_IE",
                  title: "ChawChaw 언어를 교환합시다.🗣",
                  description:
                    "대학내 교환학생 언어교환 채팅 어플리케이션입니다.",
                  images: [
                    {
                      url: "https://i.ibb.co/m0NY7yQ/image.jpg",
                      width: 800,
                      height: 600,
                      alt: "ChawChaw 소개 이미지",
                    },
                  ],
                  url: "https://www.chawchaw.vercel.app",
                  site_name: "ChawChaw",
                }}
                twitter={{
                  handle: "@chawchawTwitter",
                  site: "chawchaw.vercel.app",
                  cardType: "summary",
                }}
                additionalLinkTags={[
                  {
                    type: "image/png",
                    sizes: "32x32",
                    href: "/Layout/chaw.png",
                    rel: "icon",
                  },
                ]}
                additionalMetaTags={[
                  {
                    name: "viewport",
                    content:
                      "viewport-fit=cover, width=device-width, initial-scale=1",
                  },
                ]}
              />
              <Component {...pageProps} />
            </ChatContextProvider>
            {/* </ChatWrapper> */}
          </AuthContextProvider>
        </Errorboundary>
      </ThemeProvider>
    </Provider>
  );
}
export default wrapper.withRedux(MyApp);
