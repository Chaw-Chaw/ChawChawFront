import styled from "styled-components";
import {
  Button,
  CountriesList,
  CountryLocale,
  LanguageLocale,
  LocaleLanguage,
} from "../../../../components/common";
import { MouseEventHandler, useContext, useState } from "react";
import { AuthContext, UserPropertys } from "../../../../store/AuthContext";
import { useAlert } from "react-alert";
import axios from "axios";
import {
  DEFAULT_FACEBOOK_URL,
  DEFAULT_INSTAGRAM_URL,
} from "../../../../constants";
import ProfileContent from "./ProfileContent";
import ProfileImage from "./ProfileImage";
import ProfileSocialUrl from "./ProfileSocialUrl";
import ProfileSelectInfo from "./ProfileSelectInfo";
import { useCookies } from "react-cookie";

interface ProfileSection {
  title?: string;
  content?: string;
}

const ProfileSection: React.FC = () => {
  const message = useAlert();
  const { grantRefresh } = useContext(AuthContext);
  const [cookies] = useCookies(["accessToken"]);
  const accessToken = cookies.accessToken;

  const { user, updateUser } = useContext(AuthContext);
  const [userCountries, setUserCountries] = useState<string[]>(
    user.country || ["Select"]
  );
  const [userLanguages, setUserLanguages] = useState<string[]>(
    user.language
      ? user.language.map((item: string) => LocaleLanguage[item])
      : ["Select"]
  );
  const [userHopeLanguages, setUserHopeLanguages] = useState<string[]>(
    user.hopeLanguage
      ? user.hopeLanguage.map((item: string) => LocaleLanguage[item])
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
          Authorization: accessToken,
          Accept: "application/json",
        },
      })
      .catch((err) => err.response);

    if (response.status === 401) {
      // access token 만료
      // refresh token 전송
      grantRefresh();
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
  font-family: "BMJUA";
  width: 200px;
  margin: 20px auto;
`;
