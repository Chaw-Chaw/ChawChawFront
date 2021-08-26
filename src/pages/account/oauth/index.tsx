import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LoadingSpinner } from "../../../components/common";
import Script from "next/script";
import { AuthContext } from "../../../store/AuthContext";

interface OauthProps {
  provider: string;
}
export default function Oauth(props: OauthProps) {
  const router = useRouter();
  // 카카오에서 준 인증코드
  const { kakaoLogin } = useContext(AuthContext);

  useEffect(() => {
    if (JSON.stringify(router.query) === JSON.stringify({})) return;
    const kakaoToken = router.query.code?.toString();
    console.log(router.query);
    if (kakaoToken !== undefined) {
      console.log(kakaoToken, "KaKao Auth code 받음");
      main(kakaoToken);
    }
  }, [JSON.stringify(router.query)]);

  const main = (kakaoToken: string) => {
    kakaoLogin({ kakaoToken });
  };

  return <div></div>;
}
