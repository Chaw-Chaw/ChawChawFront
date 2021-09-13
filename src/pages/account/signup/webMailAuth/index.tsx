import { useContext, useEffect, useRef, useState } from "react";
import { Layout, Input, Label, Button } from "../../../../components/common/";
import AccountContainer from "../../../../components/account/AccountContainer";
import LoginOrder from "../../../../components/account/LoginOrder";
import styled from "styled-components";
import Link from "next/link";
import { AuthContext } from "../../../../store/AuthContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAlert } from "react-alert";
import { useRouter } from "next/router";
type Inputs = {
  webmail: string;
  verificationNum: number;
};

export default function WebMailAuth() {
  const router = useRouter();
  const message = useAlert();
  const webmailRef = useRef<HTMLInputElement>(null);
  const [webmailValidate, setWebmailValidate] = useState(false);
  const {
    sendWebmail,
    signup,
    webmailVerify,
    verificationNumber,
    user,
    accessToken,
  } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const isSocialSignup =
    user?.provider === "facebook" || user?.provider === "kakao" ? true : false;
  const [activeVerificationNumber, setActiveVerificationNumber] =
    useState<boolean>(true);

  const webmailSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (!webmailRef.current) {
      return;
    }
    const webmail = webmailRef.current.value;
    if (webmail === "") message.error("웹메일을 입력해주세요.");
    const validationWebmail = webmailVerify({ web_email: webmail });
    if (validationWebmail) {
      setWebmailValidate(false);
      setActiveVerificationNumber(false);
      console.log(webmail);
      sendWebmail({ web_email: webmail });
    } else {
      setWebmailValidate(true);
      message.error("등록되지 않은 웹메일 입니다.");
    }
  };

  const verificationNumSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!webmailRef.current) return;
    if (!(data.verificationNum && !activeVerificationNumber)) {
      message.error("인증번호를 입력해주세요.");
      return;
    }
    if (!isSocialSignup) {
      router.push("/account/signup");
      return;
    }

    verificationNumber({
      web_email: webmailRef.current.value,
      verificationNum: data.verificationNum?.toString(),
      provider: user?.provider,
    });

    signup({
      email: user?.email,
      password: "",
      name: user?.name,
      web_email: user?.web_email,
      school: user?.school,
      imageUrl: user?.imageUrl,
      provider: user?.provider,
    });
  };
  const checkKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.code === "Enter") e.preventDefault();
  };

  useEffect(() => {
    if (accessToken) {
      message.error("로그아웃 후 회원가입을 진행해주세요.", {
        onClose: () => {
          router.push("/post");
        },
      });
    }
  }, []);
  return (
    <Layout type="signup">
      <AccountContainer
        title="ChawChaw에`오신 것을 환영 해요."
        subtitle="현재 재학중인 대학교의 웹메일을 입력해주세요.`웹 메일로 인증번호가 발송됩니다."
      >
        <LoginOrder activeType="1" />
        <InputSection>
          <Label htmlFor="webmail" tag="필수">
            웹 메일
          </Label>
          <Input
            name="webmail"
            placeholder="대학교 웹메일주소"
            ref={webmailRef}
          />
          {webmailValidate && (
            <RequiredText>웹메일 형식을 맞춰주세요.</RequiredText>
          )}
        </InputSection>
        <ButtonSection>
          <Button
            onClick={(e) => {
              e.preventDefault();
              webmailSubmit(e);
            }}
            width="100%"
            height="2rem"
            fontSize="1rem"
          >
            발송하기
          </Button>
        </ButtonSection>
        <Form
          onSubmit={handleSubmit(verificationNumSubmit)}
          onKeyDown={(e) => checkKeyDown(e)}
        >
          <InputSection>
            <Label htmlFor="verificationNum" tag="필수">
              인증번호
            </Label>
            <Input
              disabled={activeVerificationNumber}
              {...register("verificationNum", {
                pattern: /[0-9]/g,
              })}
            />
            {errors.verificationNum && (
              <RequiredText>숫자만 입력해 주세요.</RequiredText>
            )}
          </InputSection>
          <MovePageButtonSection>
            <ButtonSection marginRight="20px">
              <Link href="/">
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
