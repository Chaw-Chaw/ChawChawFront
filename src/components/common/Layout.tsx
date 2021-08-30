import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import Header from "./Header";
import Head from "next/head";
import { AuthContext } from "../../store/AuthContext";
import { NextSeo } from "next-seo";

const Layout: React.FC<{ type?: string }> = (props) => {
  return (
    <>
      <Head>
        <NextSeo
          title={"ChawChaw 언어를 교환합시다.🗣"}
          description={"대학내 교환학생 언어교환 채팅 어플리케이션입니다."}
          canonical="https://www.chawchaw.vercel.app"
          openGraph={{
            type: "website",
            locale: "en_IE",
            title: "ChawChaw 언어를 교환합시다.🗣",
            description: "대학내 교환학생 언어교환 채팅 어플리케이션입니다.",
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
        />
      </Head>
      <Header type={props.type} />
      <Inner>{props.children}</Inner>
    </>
  );
};

const Inner = styled.main`
  margin: 0px auto 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 768px) {
    margin: 0px auto 0 auto;
  }
`;

export { Layout };
