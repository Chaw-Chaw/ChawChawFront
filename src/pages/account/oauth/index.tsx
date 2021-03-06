import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { useAppDispatch } from "../../../hooks/redux";
import { KAKAO_PROVIDER } from "../../../constants";
import { login } from "../../../store/actions/authActions";

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
