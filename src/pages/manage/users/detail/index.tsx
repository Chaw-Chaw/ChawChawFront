import axios from "axios";
import { useRouter } from "next/router";
import { MouseEventHandler, useContext, useEffect, useState } from "react";
import { ManageLayout } from "../../../../components/manage/ManageLayout";
import { AuthContext } from "../../../../store/AuthContext";
import { divideMain, getSecureLocalStorage } from "../../../../utils";
import {
  ProfileHeader,
  ProfileContent,
  ProfileInfoBox,
  ProfileSelectInfo,
  ProfileSocialUrl,
} from "../../../../components/profile/ProfileSection/";
import styled from "styled-components";
import {
  Button,
  CountryLocale,
  LanguageLocale,
  LocaleLanguage,
} from "../../../../components/common";
import {
  DEFAULT_FACEBOOK_URL,
  DEFAULT_INSTAGRAM_URL,
} from "../../../../constants";
import { useAlert } from "react-alert";
import { ManageBlockList } from "../../../../components/manage/ManageBlockList";
import { ManageUserDelete } from "../../../../components/manage/ManageUserDelete";
import { ManageUserUniversity } from "../../../../components/manage/ManageUserUniversity";
import ManageProfileImage from "../../../../components/manage/ManageProfileImage";

interface userInfoType {
  name: string;
  imageUrl: string;
  content: string;
  country: string[];
  language: string[];
  hopeLanguage: string[];
  repCountry: string;
  repLanguage: string;
  repHopeLanguage: string;
  facebookUrl: string;
  instagramUrl: string;
  days: string;
  views: number;
  likes: number;
  blockUsers: {
    userId: number;
    name: string;
    imageUrl: string;
  }[];
}

export default function ManageUserDetail() {
  const router = useRouter();
  const message = useAlert();
  const { grantRefresh } = useContext(AuthContext);
  const [userId, setUserId] = useState(-1);
  const [userInfo, setUserInfo] = useState<userInfoType>({
    name: "",
    imageUrl: "",
    content: "",
    country: [""],
    language: [""],
    hopeLanguage: [""],
    repCountry: "",
    repLanguage: "",
    repHopeLanguage: "",
    facebookUrl: "",
    instagramUrl: "",
    days: "",
    views: 0,
    likes: 0,
    blockUsers: [
      {
        userId: 0,
        name: "",
        imageUrl: "",
      },
    ],
  });
  const [userSchool, setUserSchool] = useState<string>("");
  const [userCountries, setUserCountries] = useState<string[]>(["Select"]);
  const [userLanguages, setUserLanguages] = useState<string[]>(["Select"]);
  const [userHopeLanguages, setUserHopeLanguages] = useState<string[]>([
    "Select",
  ]);
  const [userContent, setUserContent] = useState<string>("");
  const [userFaceBookUrl, setUserFaceBookUrl] =
    useState<string>(DEFAULT_FACEBOOK_URL);
  const [userInstagramUrl, setUserInstagramUrl] = useState<string>(
    DEFAULT_INSTAGRAM_URL
  );

  const getUserDetailInfo = async (userId: number) => {
    const response = await axios
      .get(`/admin/users/${userId}`, {
        headers: {
          Authorization: getSecureLocalStorage("accessToken"),
        },
      })
      .catch((err) => err.response);

    if (response.status === 401) {
      grantRefresh();
      return;
    }
    console.log(response, "getUserDetailInfo");
    if (!response.data.isSuccess) {
      return;
    }
    setUserInfo(response.data.data);
    return response.data.data;
  };

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

    const body = {
      userId: router.query.userId,
      country,
      language,
      hopeLanguage,
      content: userContent,
      facebookUrl: userFaceBookUrl,
      instagramUrl: userInstagramUrl,
      imageUrl: userInfo.imageUrl,
      repCountry: country[0],
      repLanguage: language[0],
      repHopeLanguage: hopeLanguage[0],
    };

    console.log(body, "profileInfo");

    const response = await axios
      .post("/admin/users/profile", body, {
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
      grantRefresh();
    }

    if (!response.data.isSuccess) {
      console.error(response.data);
      return;
    }
    message.success("프로필이 수정 되었습니다.");
  };

  useEffect(() => {
    if (JSON.stringify(router.query) === JSON.stringify({})) return;
    const userId = router.query.userId
      ? Number(router.query.userId)
      : undefined;
    const userSchool = router.query.userSchool
      ? String(router.query.userSchool)
      : undefined;

    // 라우터 쿼리에 userId가 없으면 무시
    if (userId === undefined) return;
    getUserDetailInfo(userId);
    setUserId(userId);

    if (userSchool === undefined) return;
    setUserSchool(userSchool);
  }, [JSON.stringify(router.query)]);

  useEffect(() => {
    setUserContent(userInfo.content);
    setUserCountries(divideMain(userInfo.repCountry, userInfo.country));
    setUserFaceBookUrl(userInfo.facebookUrl);
    setUserHopeLanguages(
      divideMain(
        LocaleLanguage[userInfo.repHopeLanguage],
        userInfo.hopeLanguage.map((item: string) => LocaleLanguage[item])
      )
    );
    setUserInstagramUrl(userInfo.instagramUrl);
    setUserLanguages(
      divideMain(
        LocaleLanguage[userInfo?.repLanguage],
        userInfo.language.map((item: string) => LocaleLanguage[item])
      )
    );
  }, [JSON.stringify(userInfo)]);

  return (
    <ManageLayout>
      <ManageDetailContainer>
        <ProfileHeadBox>
          <ManageProfileImage userId={userId} userImage={userInfo.imageUrl} />
          <ProfileContent
            title="유저의 프로필 소개글을 수정합니다."
            placeholder="유저의 소개글이 비어있습니다."
            setValues={setUserContent}
            values={userContent}
            name={userInfo.name}
          />
        </ProfileHeadBox>
        <ProfileInfoBox>
          <ProfileSelectInfo
            title="국적"
            description="유저의 국적을 관리합니다. (최대 2개) 가장 첫 칸은 대표 국적으로 표시됩니다. "
            type="country"
            count={2}
            setValues={setUserCountries}
            values={userCountries}
          />
          <ProfileSelectInfo
            title="유저의 선택 언어"
            description="유저의 선택언어를 관리합니다. (최대 4개) 가장 첫 칸은 대표 언어로 표시됩니다. "
            type="language"
            count={4}
            setValues={setUserLanguages}
            values={userLanguages}
          />
          <ProfileSelectInfo
            title="유저의 선택 희망 언어"
            description="유저의 선택 희망언어를 관리합니다. (최대 4개) 가장 첫 칸은 주 언어로 표시됩니다."
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
        <ProfileModifyButton onClick={onSubmit}>
          프로필 수정
        </ProfileModifyButton>
        <ManageContainer>
          <ManageBlockList blockList={userInfo.blockUsers} />
          <ManageUserUniversity userSchool={userSchool} />
          <ManageUserDelete userId={userId} />
        </ManageContainer>
      </ManageDetailContainer>
    </ManageLayout>
  );
}

const ManageDetailContainer = styled.div`
  width: calc(100% - 300px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-left: 50px;
  padding-top: 700px;
  padding-bottom: 100px;
  overflow: auto;
  box-sizing: border-box;
  max-height: 100vh;
`;

const ProfileHeadBox = styled(ProfileHeader)`
  justify-content: center;
`;

const ProfileModifyButton = styled(Button)`
  width: 200px;
  margin: 20px auto;
  min-height: 30px;
`;

const ManageContainer = styled.div`
  width: 650px;
`;
