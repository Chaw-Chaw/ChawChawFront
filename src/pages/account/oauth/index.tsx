import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { useLogin } from "../../../hooks/api/account/useLogin";
import { useAppDispatch } from "../../../hooks/redux";
import { authActions, login } from "../../../store/authSlice";
import { KAKAO_PROVIDER } from "../../../constants";

interface OauthProps {
  provider: string;
}
export default function Oauth(props: OauthProps) {
  const router = useRouter();
  const routerQuery = JSON.stringify(router.query);
  // 카카오에서 준 인증코드
  const dispatch = useAppDispatch();

  const main = useCallback(
    async (kakaoToken: string) => {
      dispatch(login({ kakaoToken, provider: KAKAO_PROVIDER }));
    },
    [dispatch]
  );

  useEffect(() => {
    if (routerQuery === JSON.stringify({})) return;
    const kakaoToken = router.query.code?.toString();
    if (kakaoToken !== undefined) {
      (async () => {
        await main(kakaoToken);
      })();
    }
  }, [routerQuery, main, router.query.code]);

  return <div></div>;
}
