import {
  KeyboardEventHandler,
  MouseEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Layout, Input, Label, Button } from "../../../../components/common/";
import AccountContainer from "../../../../components/account/AccountContainer";
import SignupOrder from "../../../../components/account/SignupOrder";
import styled from "styled-components";
import Link from "next/link";
import { AuthContext } from "../../../../store/AuthContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAlert } from "react-alert";
import { useRouter } from "next/router";
import { useSignup } from "../../../../hooks/api/account/useSignup";
import {
  MAIN_PAGE,
  POST_PAGE_URL,
  SIGNUP_PAGE_URL,
} from "../../../../constants";
type Inputs = {
  webmail: string;
  verificationNumber: number;
};

export default function WebMailAuth() {
  const router = useRouter();
  const message = useAlert();
  const webmailRef = useRef<HTMLInputElement>(null);
  const [webmailValidate, setWebmailValidate] = useState(false);
  const { user, isLogin } = useContext(AuthContext);
  const { signup, sendWebmail, verificationNumber, webmailVerify } =
    useSignup();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const isSocialSignup =
    user.provider === "kakao" || user.provider === "facebook";
  const [activeVerificationNumber, setActiveVerificationNumber] =
    useState<boolean>(true);

  const publishSubmit = () => {
    try {
      if (!webmailRef.current) {
        throw new SyntaxError("웹메일 칸이 없습니다.");
      }
      const webmail = webmailRef.current.value;
      if (webmail === "") {
        throw new Error("웹메일을 입력해주세요.");
      }

      const validationWebmail = webmailVerify(webmail);
      if (validationWebmail) {
        setWebmailValidate(false);
        setActiveVerificationNumber(false);
        sendWebmail({ email: webmail });
      } else {
        setWebmailValidate(true);
        throw new Error("등록되지 않은 웹메일 입니다.");
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  const verifyNumberSubsequent = () => {
    if (!isSocialSignup) {
      router.push(SIGNUP_PAGE_URL);
      return;
    }

    if (
      user.email &&
      user.name &&
      user.web_email &&
      user.school &&
      user.imageUrl &&
      user.provider
    ) {
      signup({
        email: user.email,
        name: user.name,
        web_email: user.web_email,
        school: user.school,
        imageUrl: user.imageUrl,
        provider: user.provider,
      });
    }
  };

  const verificationNumSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!webmailRef.current) return;
    if (!(data.verificationNumber && !activeVerificationNumber)) {
      message.error("인증번호를 입력해주세요.");
      return;
    }

    try {
      await verificationNumber({
        email: webmailRef.current.value,
        verificationNumber: data.verificationNumber,
      });
    } catch {
      return;
    }

    message.success("인증번호 확인을 완료하였습니다.", {
      onClose: verifyNumberSubsequent,
    });
  };

  const handleClickPublishBtn: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    publishSubmit();
  };

  const handleKeyDown: KeyboardEventHandler<HTMLFormElement> = (e) => {
    if (e.code === "Enter") e.preventDefault();
  };

  useEffect(() => {
    if (isLogin) {
      message.error("로그아웃 후 회원가입을 진행해주세요.", {
        onClose: () => {
          router.push(POST_PAGE_URL);
        },
      });
      return;
    }
  }, []);

  const webmailSection = (
    <InputSection>
      <Label htmlFor="webmail" tag="필수">
        웹 메일
      </Label>
      <Input name="webmail" placeholder="대학교 웹메일주소" ref={webmailRef} />
      {webmailValidate && (
        <RequiredText>웹메일 형식을 맞춰주세요.</RequiredText>
      )}
    </InputSection>
  );

  const publishWebmailButton = (
    <ButtonSection>
      <PublishButton
        onClick={handleClickPublishBtn}
        width="100%"
        height="2rem"
        fontSize="1rem"
      >
        발송하기
      </PublishButton>
    </ButtonSection>
  );

  const enterVerifyNumberSection = (
    <InputSection>
      <Label htmlFor="verificationNumber" tag="필수">
        인증번호
      </Label>
      <Input
        disabled={activeVerificationNumber}
        {...register("verificationNumber", {
          pattern: /[0-9]/g,
        })}
      />
      {errors.verificationNumber && (
        <RequiredText>숫자만 입력해 주세요.</RequiredText>
      )}
    </InputSection>
  );

  return (
    <Layout>
      <AccountContainer
        title="ChawChaw에`오신 것을 환영 해요."
        subtitle="현재 재학중인 대학교의 웹메일을 입력해주세요.`웹 메일로 인증번호가 발송됩니다."
      >
        <SignupOrder activeType="1" />
        {webmailSection}
        {publishWebmailButton}
        <Form
          onSubmit={handleSubmit(verificationNumSubmit)}
          onKeyDown={handleKeyDown}
        >
          {enterVerifyNumberSection}
          <MovePageButtonSection>
            <ButtonSection marginRight="20px">
              <Link href={MAIN_PAGE}>
                <a>
                  <Button secondary width="100%" height="4rem" fontSize="1rem">
                    페이지 소개
                  </Button>
                </a>
              </Link>
            </ButtonSection>
            <ButtonSection marginLeft="20px">
              <Button type="submit" width="100%" height="4rem" fontSize="1rem">
                {isSocialSignup ? "회원가입" : "회원 정보 입력"}
              </Button>
            </ButtonSection>
          </MovePageButtonSection>
        </Form>
      </AccountContainer>
    </Layout>
  );
}

const InputSection = styled.div`
  width: 100%;
  margin: 20px 0;
`;

const PublishButton = styled(Button)``;
const ButtonSection = styled.div<{ marginRight?: string; marginLeft?: string }>`
  margin-right: ${(props) => (props.marginRight ? props.marginRight : "0px")};
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : "0px")};
  width: 100%;
`;

const MovePageButtonSection = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
`;
const Form = styled.form`
  width: 100%;
`;

const RequiredText = styled.span`
  color: ${(props) => props.theme.primaryColor};
  font-size: 0.8rem;
`;
