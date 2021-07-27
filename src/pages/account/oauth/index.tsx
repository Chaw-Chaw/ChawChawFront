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
    const code = router.query.code?.toString();
    console.log(router.query);
    if (code !== undefined) {
      console.log(code, "KaKao Auth code 받음");
      main(code);
    }
  }, [router.query]);

  const main = async (code: string) => {
    kakaoLogin({ code });
    // await loadUserInfo(accessToken)
  };

  return (
    <div>
      <Script src="https://developers.kakao.com/sdk/js/kakao.js"></Script>
      카카오 로그인중
      <LoadingSpinner></LoadingSpinner>
    </div>
  );
}
