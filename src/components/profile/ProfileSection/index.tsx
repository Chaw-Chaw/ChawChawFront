import styled from "styled-components";
import {
  Button,
  CountryLocale,
  LanguageLocale,
  LocaleLanguage,
} from "../../common";
import { MouseEventHandler, useContext, useState } from "react";
import { AuthContext } from "../../../store/AuthContext";
import { useAlert } from "react-alert";
import axios from "axios";
import {
  DEFAULT_FACEBOOK_URL,
  DEFAULT_INSTAGRAM_URL,
} from "../../../constants";
import ProfileContent from "./ProfileContent";
import ProfileImage from "./ProfileImage";
import ProfileSocialUrl from "./ProfileSocialUrl";
import ProfileSelectInfo from "./ProfileSelectInfo";
import { divideMain, getSecureLocalStorage } from "../../../utils";

interface ProfileSection {
  title?: string;
  content?: string;
}

const ProfileSection: React.FC = () => {
  const message = useAlert();
  const { grantRefresh } = useContext(AuthContext);
  const { user, updateUser } = useContext(AuthContext);
  const [userCountries, setUserCountries] = useState<string[]>(
    user.country && user.repCountry
      ? divideMain(user.repCountry, user.country)
      : ["Select"]
  );
  const [userLanguages, setUserLanguages] = useState<string[]>(
    user.language && user.repLanguage
      ? divideMain(
          LocaleLanguage[user?.repLanguage],
          user.language.map((item: string) => LocaleLanguage[item])
        )
      : ["Select"]
  );
  const [userHopeLanguages, setUserHopeLanguages] = useState<string[]>(
    user.hopeLanguage && user.repHopeLanguage
      ? divideMain(
          LocaleLanguage[user.repHopeLanguage],
          user.hopeLanguage.map((item: string) => LocaleLanguage[item])
        )
      : ["Select"]
  );
  const [userContent, setUserContent] = useState<string>(user.content || "");
  const [userFaceBookUrl, setUserFaceBookUrl] = useState<string>(
    user.facebookUrl || DEFAULT_FACEBOOK_URL
  );
  const [userInstagramUrl, setUserInstagramUrl] = useState<string>(
    user.instagramUrl || DEFAULT_INSTAGRAM_URL
  );

  const onSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    const country: string[] = [];
    userCountries.forEach((item) => {
      if (Object.keys(CountryLocale).includes(item)) country.push(item);
    });
    const language: string[] = [];
    userLanguages.forEach((item) => {
      const convertedItem = LanguageLocale[item];
      if (convertedItem) language.push(convertedItem);
    });
    const hopeLanguage: string[] = [];
    userHopeLanguages.forEach((item) => {
      const convertedItem = LanguageLocale[item];
      if (convertedItem) hopeLanguage.push(convertedItem);
    });

    if (
      country.length === 0 ||
      language.length === 0 ||
      hopeLanguage.length === 0
    ) {
      message.error("나라와 언어들을 하나 이상 선택해주세요.");
      return;
    }

    const userProfile = {
      country,
      language,
      hopeLanguage,
      content: userContent,
      facebookUrl: userFaceBookUrl,
      instagramUrl: userInstagramUrl,
      imageUrl: user?.imageUrl,
      repCountry: country[0],
      repLanguage: language[0],
      repHopeLanguage: hopeLanguage[0],
    };
    console.log(userProfile, "profileInfo");
    const response = await axios
      .post("/users/profile", userProfile, {
        headers: {
          "Content-Type": "application/json",
          Authorization: getSecureLocalStorage("accessToken"),
          Accept: "application/json",
        },
      })
      .catch((err) => err.response);

    if (response.status === 401) {
      // access token 만료
      // refresh token 전송
      if (response.data.responseMessage === "다른 곳에서 접속함") {
        message.error(
          "현재 같은 아이디로 다른 곳에서 접속 중 입니다. 계속 이용하시려면 다시 로그인 해주세요.",
          {
            onClose: () => {
              window.localStorage.clear();
              window.location.href = "/account/login";
            },
          }
        );
      }
      await grantRefresh();
      onSubmit(e);
      return;
    }

    if (!response.data.isSuccess) {
      console.error(response.data);
      return;
    }
    message.success("프로필이 업로드 되었습니다.");
    updateUser(userProfile);
  };

  return (
    <Container>
      <ProfileHeader>
        <ProfileImage />
        <ProfileContent
          title="포스팅에 올라갈 당신의 매력을 어필해보세요!"
          placeholder="당신을 소개할 내용을 입력해주세요."
          setValues={setUserContent}
          values={userContent}
          name={user.name}
        />
      </ProfileHeader>
      <ProfileInfoBox>
        <ProfileSelectInfo
          title="Mother Country"
          description="자신의 국적을 추가해주세요. (최대 2개) 가장 첫 칸은 주 국적으로 표시됩니다. "
          type="country"
          count={2}
          setValues={setUserCountries}
          values={userCountries}
        />
        <ProfileSelectInfo
          title="Language you can"
          description="자신이 할 수 있는 언어를 추가해주세요. (최대 4개) 가장 첫 칸은 주 언어로 표시됩니다. "
          type="language"
          count={4}
          setValues={setUserLanguages}
          values={userLanguages}
        />
        <ProfileSelectInfo
          title="Learning lanugage"
          description="배우고 싶은 언어를 모두 추가해주세요. (최대 4개) 가장 첫 칸은 주 언어로 표시됩니다."
          type="hopeLanguage"
          count={4}
          setValues={setUserHopeLanguages}
          values={userHopeLanguages}
        />
        <ProfileSocialUrl
          setFaceBookUrl={setUserFaceBookUrl}
          setInstagramUrl={setUserInstagramUrl}
          faceBookUrl={userFaceBookUrl}
          instagramUrl={userInstagramUrl}
        />
      </ProfileInfoBox>
      <ProfileUploadButton onClick={onSubmit}>
        프로필 업로드
      </ProfileUploadButton>
    </Container>
  );
};

export default ProfileSection;
export {
  ProfileHeader,
  ProfileImage,
  ProfileContent,
  ProfileInfoBox,
  ProfileSelectInfo,
  ProfileSocialUrl,
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 50px 0px;
`;
const ProfileHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ProfileInfoBox = styled.div`
  width: 650px;
  @media (max-width: 768px) {
    width: 500px;
  }
  @media (max-width: 500px) {
    width: 320px;
  }
`;

const ProfileUploadButton = styled(Button)`
  width: 200px;
  margin: 20px auto;
`;
