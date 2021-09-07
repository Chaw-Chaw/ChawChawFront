import React, { MouseEvent, useContext, useEffect, useState } from "react";
import {
  Layout,
  Input,
  Label,
  Button,
  PasswordInput,
} from "../../../components/common/";
import AccountContainer from "../../../components/account/AccountContainer";
import LoginOrder from "../../../components/account/LoginOrder";
import styled from "styled-components";
import Link from "next/link";
import { AuthContext } from "../../../store/AuthContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAlert } from "react-alert";
import { useRouter } from "next/router";

interface Inputs {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
}

export default function SignUp() {
  const [isEmailDupCheck, setIsEmailDupCheck] = useState(false);
  const message = useAlert();
  const router = useRouter();
  const { signup, emailDuplicationCheck, updateUser, accessToken } =
    useContext(AuthContext);
  const { user } = useContext(AuthContext);

  const userUniversity = user.school;
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    console.log(isEmailDupCheck, "이메일 중복체크");
    if (
      data.email === "" ||
      data.username === "" ||
      data.password === "" ||
      data.passwordConfirm === ""
    ) {
      message.error("입력칸을 모두 입력해주세요.");
      return;
    }
    if (!isEmailDupCheck) {
      message.error("이메일 중복체크를 해주세요.");
      return;
    }
    if (userUniversity === "") {
      message.error("웹메일 인증을 해주세요.");
      router.push("/account/login");
    }
    updateUser({
      email: data.email,
      name: data.username,
    });
    if (user) {
      signup({
        email: data.email,
        password: data.password,
        name: data.username,
        web_email: user?.web_email,
        school: user.school ? user.school : "",
        imageUrl: user.imageUrl ? user.imageUrl : "",
        provider: user.provider ? user.provider : "",
      });
    } else {
      message.error("user data가 없습니다."),
        console.log(user, "user data가 부족합니다.");
    }
  };

  useEffect(() => {
    const userSchool = user.school;
    if (accessToken) {
      message.error("로그아웃 후 회원가입을 진행해주세요.", {
        onClose: () => {
          router.push("/post");
        },
      });
    }

    if (!userSchool)
      message.error("웹메일 인증을 먼저 진행해주세요.", {
        onClose: () => {
          router.push("/account/signup/webMailAuth");
        },
      });
  }, []);

  const emailDupCheckHandle = async (e: MouseEvent) => {
    e.preventDefault();
    const email = watch("email");
    if (email !== "") {
      const result = await emailDuplicationCheck({ email });
      setIsEmailDupCheck(!result);
      console.log(result, "이메일 중복 체크 결과");
      // 중복된 이메일이 있으면 사용자가 회원가입이 불가능
    } else message.error("이메일을 입력해주세요.");
  };

  return (
    <Layout type="signup">
      <AccountContainer
        title="회원 정보 입력"
        subtitle="ChawChaw에서 사용할 정보를 입력해주세요.` 이메일 / 비밀번호"
      >
        <LoginOrder activeType="2" />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputSection>
            <Label htmlFor="email">이메일</Label>
            <EmailInputBox>
              <Input
                placeholder="example@address.com"
                {...register("email", {
                  pattern:
                    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
                })}
              />
              {errors.email && (
                <RequiredText>이메일 형식을 맞춰주세요.</RequiredText>
              )}
              <EmailDuplicationCheckButton
                onClick={(e: MouseEvent) => {
                  e.preventDefault();
                  emailDupCheckHandle(e);
                }}
              >
                중복검사
              </EmailDuplicationCheckButton>
            </EmailInputBox>
          </InputSection>
          <InputSection>
            <Label htmlFor="username">이름</Label>
            <Input {...register("username")} />
          </InputSection>
          <InputSection>
            <Label htmlFor="password">비밀번호</Label>
            <PasswordInput
              name="password"
              register={{
                ...register("password", {
                  pattern:
                    /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/,
                }),
              }}
            />
            {errors.password && (
              <RequiredText>
                비밀번호 형식은 특수문자/문자/숫자 조합 8 ~ 15 글자 입니다.
              </RequiredText>
            )}
          </InputSection>
          <InputSection>
            <Label htmlFor="passwordConfirm" tag="확인">
              비밀번호
            </Label>
            <PasswordInput
              name="passwordConfirm"
              register={{
                ...register("passwordConfirm", {
                  pattern:
                    /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/,
                }),
              }}
            />
            {watch("password") !== watch("passwordConfirm") && (
              <RequiredText>입력하신 비밀번호와 같지 않습니다.</RequiredText>
            )}
          </InputSection>

          <InputSection>
            <Label htmlFor="university" tag="필수">
              소속학교
            </Label>
            <Input name="university" disabled defaultValue={userUniversity} />
          </InputSection>
          <MovePageButtonSection>
            <ButtonSection marginRight="20px">
              <Link href="/account/signup/webMailAuth">
                <a>
                  <Button secondary width="100%" height="4rem" fontSize="1rem">
                    웹메일 인증
                  </Button>
                </a>
              </Link>
            </ButtonSection>
            <ButtonSection marginLeft="20px">
              <Button type="submit" width="100%" height="4rem" fontSize="1rem">
                회원가입
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
  margin: 10px 0;
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

const EmailInputBox = styled.div`
  display: flex;
  align-items: center;
`;

const EmailDuplicationCheckButton = styled(Button)`
  margin: 0px 0px 8px 5px;
  height: 40px;
  border-radius: 4px;
  font-size: 0.8rem;
`;

const Form = styled.form`
  width: 100%;
`;
const RequiredText = styled.span`
  color: ${(props) => props.theme.primaryColor};
  font-size: 0.8rem;
`;
