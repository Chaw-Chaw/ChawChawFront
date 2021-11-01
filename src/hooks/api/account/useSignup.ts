import { useApi } from "../useApi";
import {
  CONFIRM_DUP_EMAIL_API_URL,
  SENDMAIL_API_URL,
  SIGNUP_API_URL,
  VERIFY_WEBMAIL_API_URL,
} from "../../../constants/apiUrls";
import { SignupProps, SignupPropsSocial } from "../../../../types/account";
import { useAlert } from "react-alert";
import { useContext } from "react";
import { AuthContext } from "../../../store/AuthContext";
import { useRouter } from "next/router";
import { LOGIN_PAGE_URL } from "../../../constants/pageUrls";
import { universityList } from "../../../constants/UniversityList";

export const useSignup = () => {
  const { sendPost, sendGet } = useApi();
  const { setUser, updateUser } = useContext(AuthContext);
  const router = useRouter();
  const message = useAlert();
  const signup = async (body: SignupProps | SignupPropsSocial) => {
    await sendPost<undefined>(SIGNUP_API_URL, body);
    setUser({});
    window.localStorage.clear();
    message.success("회원가입에 성공하셨습니다.", {
      onClose: () => {
        router.push(LOGIN_PAGE_URL);
      },
    });
    return;
  };

  const emailDuplicationCheck = async (email: string) => {
    try {
      await sendGet<undefined>(CONFIRM_DUP_EMAIL_API_URL + `/${email}`);
      message.info("사용가능한 아이디 입니다.");
    } catch (err) {
      throw err;
    }
  };

  const sendWebmail = async (body: { email: string }) => {
    await sendPost<undefined>(SENDMAIL_API_URL, body);
    message.success(
      "이메일 발송을 완료하였습니다. 인증번호의 만료시간은 3분 입니다."
    );
    return;
  };

  const verificationNumber = async (body: {
    email: string;
    verificationNumber: number;
  }) => {
    await sendPost<undefined>(VERIFY_WEBMAIL_API_URL, body);
  };

  const webmailVerify = (web_email: string) => {
    const domain = web_email?.split("@")[1];
    if (domain) {
      if (Object.values(universityList).includes(domain)) {
        const universityName = Object.keys(universityList).find(
          (item: string) => universityList[item] === domain
        );
        updateUser({ school: universityName, web_email: web_email });
        return true;
      }
      return false;
    }
    return false;
  };

  return {
    signup,
    emailDuplicationCheck,
    sendWebmail,
    verificationNumber,
    webmailVerify,
  };
};
