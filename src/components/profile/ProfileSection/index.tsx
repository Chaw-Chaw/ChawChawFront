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
import {
  DEFAULT_FACEBOOK_URL,
  DEFAULT_INSTAGRAM_URL,
  DEFAULT_PROFILE_IMAGE,
} from "../../../constants";
import ProfileContent from "./ProfileContent";
import ProfileImage from "./ProfileImage";
import ProfileSocialUrl from "./ProfileSocialUrl";
import ProfileSelectInfo from "./ProfileSelectInfo";
import { useProfile } from "../../../hooks/api/profile/useProfile";
import { arrayRemovedItem } from "../../../utils";

interface ProfileSection {
  title?: string;
  content?: string;
}

const ProfileSection: React.FC = () => {
  const message = useAlert();
  const { uploadProfile } = useProfile();
  const { user, updateUser } = useContext(AuthContext);

  const [userCountries, setUserCountries] = useState<string[]>(
    user.country && user.repCountry
      ? [user.repCountry, ...arrayRemovedItem(user.repCountry, user.country)]
      : ["Select"]
  );
  const [userLanguages, setUserLanguages] = useState<string[]>(
    user.language && user.repLanguage
      ? [
          user.repLanguage,
          ...arrayRemovedItem(user.repLanguage, user.language),
        ].map((item) => LocaleLanguage[item])
      : ["Select"]
  );
  const [userHopeLanguages, setUserHopeLanguages] = useState<string[]>(
    user.hopeLanguage && user.repHopeLanguage
      ? [
          user.repHopeLanguage,
          ...arrayRemovedItem(user.repHopeLanguage, user.hopeLanguage),
        ].map((item) => LocaleLanguage[item])
      : ["Select"]
  );
  const [userContent, setUserContent] = useState<string>(user.content || "");
  const [userFaceBookUrl, setUserFaceBookUrl] = useState<string>(
    user.facebookUrl || DEFAULT_FACEBOOK_URL
  );
  const [userInstagramUrl, setUserInstagramUrl] = useState<string>(
    user.instagramUrl || DEFAULT_INSTAGRAM_URL
  );

  const onSubmit = async () => {
    const country: string[] = [];
    userCountries.forEach((item, index) => {
      if (Object.keys(CountryLocale).includes(item) && index !== 0)
        country.push(item);
    });
    const language: string[] = [];
    userLanguages.forEach((item, index) => {
      const convertedItem = LanguageLocale[item];
      if (convertedItem && index !== 0) language.push(convertedItem);
    });
    const hopeLanguage: string[] = [];
    userHopeLanguages.forEach((item, index) => {
      const convertedItem = LanguageLocale[item];
      if (convertedItem && index !== 0) hopeLanguage.push(convertedItem);
    });

    if (
      userCountries.length === 0 ||
      userLanguages.length === 0 ||
      userHopeLanguages.length === 0
    ) {
      throw new Error("나라와 언어들을 하나 이상 선택해주세요.");
    }

    const userProfile = {
      country,
      language,
      hopeLanguage,
      content: userContent,
      facebookUrl: userFaceBookUrl,
      instagramUrl: userInstagramUrl,
      imageUrl: user?.imageUrl || DEFAULT_PROFILE_IMAGE,
      repCountry: userCountries[0],
      repLanguage: LanguageLocale[userLanguages[0]],
      repHopeLanguage: LanguageLocale[userHopeLanguages[0]],
    };

    await uploadProfile(userProfile);
    return userProfile;
  };

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    const userProfile = await onSubmit();
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
          type="country"
          description="자신의 국적을 추가해주세요. (최대 2개) 가장 첫 칸은 주 국적으로 표시됩니다. "
          count={2}
          setValues={setUserCountries}
          values={userCountries}
        />
        <ProfileSelectInfo
          title="Language you can"
          type="language"
          description="자신이 할 수 있는 언어를 추가해주세요. (최대 4개) 가장 첫 칸은 주 언어로 표시됩니다. "
          count={4}
          setValues={setUserLanguages}
          values={userLanguages}
        />
        <ProfileSelectInfo
          title="Learning lanugage"
          type="language"
          description="배우고 싶은 언어를 모두 추가해주세요. (최대 4개) 가장 첫 칸은 주 언어로 표시됩니다."
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
      <ProfileUploadButton onClick={handleClick}>
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
