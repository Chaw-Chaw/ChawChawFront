import { useEffect } from "react";
import { useRouter } from "next/router";
import { useLogin } from "../../../hooks/api/account/useLogin";
import { useAppDispatch } from "../../../hooks/redux";
import { authActions, login } from "../../../store/authSlice";

interface OauthProps {
  provider: string;
}
export default function Oauth(props: OauthProps) {
  const router = useRouter();
  // 카카오에서 준 인증코드
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (JSON.stringify(router.query) === JSON.stringify({})) return;
    const kakaoToken = router.query.code?.toString();
    if (kakaoToken !== undefined) {
      (async () => {
        await main(kakaoToken);
      })();
    }
  }, [JSON.stringify(router.query)]);

  const main = async (kakaoToken: string) => {
    dispatch(login({ kakaoToken, provider: "kakao" }));
    // await login({ kakaoToken, provider: "kakao" });
  };

  return <div></div>;
}
