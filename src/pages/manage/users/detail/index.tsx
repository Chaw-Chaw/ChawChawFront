import { useRouter } from "next/router";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { ManageLayout } from "../../../../components/manage/ManageLayout";
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
import { ADMIN_ROLE, INITIAL_ID } from "../../../../constants";
import { ManageBlockList } from "../../../../components/manage/ManageBlockList";
import { ManageUserDelete } from "../../../../components/manage/ManageUserDelete";
import { ManageUserUniversity } from "../../../../components/manage/ManageUserUniversity";
import ManageProfileImage from "../../../../components/manage/ManageProfileImage";

import { ManageUserInfoType } from "../../../../types/profile";
import {
  COUNTRY_TYPE,
  INIT_USERINFO,
  LANGUAGE_TYPE,
  SELECT,
} from "../../../../constants/profile";
import { arrayRemovedItem, isLogin } from "../../../../utils";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import {
  getUserDetailInfo,
  manageUploadUserProfile,
} from "../../../../store/actions/profileActions";
import { asyncErrorHandle } from "../../../../store/alertSlice";

function ManageUserDetail() {
  const user = useAppSelector((state) => state.auth.user);
  const userRole = user.role;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const routerQueryJSON = JSON.stringify(router.query);

  const [userId, setUserId] = useState(INITIAL_ID);
  const [userInfo, setUserInfo] = useState<ManageUserInfoType>(INIT_USERINFO);
  const [userSchool, setUserSchool] = useState<string>("");
  const [userCountries, setUserCountries] = useState<string[]>(
    INIT_USERINFO.country
  );
  const [userLanguages, setUserLanguages] = useState<string[]>(
    INIT_USERINFO.language
  );
  const [userHopeLanguages, setUserHopeLanguages] = useState<string[]>(
    INIT_USERINFO.hopeLanguage
  );
  const [userContent, setUserContent] = useState<string>(INIT_USERINFO.content);
  const [userFaceBookUrl, setUserFaceBookUrl] = useState<string>(
    INIT_USERINFO.facebookUrl
  );
  const [userInstagramUrl, setUserInstagramUrl] = useState<string>(
    INIT_USERINFO.instagramUrl
  );

  const onSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    try {
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
        userId: Number(router.query.userId),
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
      await dispatch(manageUploadUserProfile(body));
    } catch (error) {
      dispatch(asyncErrorHandle(error));
    }
  };

  useEffect(() => {
    try {
      if (userRole !== ADMIN_ROLE || !isLogin()) {
        return;
      }
      if (routerQueryJSON === JSON.stringify({})) return;
      const userId = router.query.userId
        ? Number(router.query.userId)
        : undefined;
      const userSchool = router.query.school
        ? String(router.query.school)
        : undefined;

      // 라우터 쿼리에 userId가 없으면 무시
      if (userId === undefined) return;
      setUserId(userId);

      (async () => {
        const data = await dispatch(getUserDetailInfo(userId)).unwrap();
        setUserInfo(data);
      })();

      if (userSchool === undefined) return;
      setUserSchool(userSchool);
    } catch (error) {
      dispatch(asyncErrorHandle(error));
    }
  }, [
    routerQueryJSON,
    userRole,
    dispatch,
    router.query.school,
    router.query.userId,
  ]);

  useEffect(() => {
    setUserContent(userInfo.content);
  }, [userInfo.content]);

  useEffect(() => {
    setUserLanguages(
      userInfo.language && userInfo.repLanguage
        ? [
            userInfo.repLanguage,
            ...arrayRemovedItem(userInfo.repLanguage, userInfo.language),
          ].map((item) => LocaleLanguage[item])
        : [SELECT]
    );
  }, [userInfo.language, userInfo.repLanguage]);

  useEffect(() => {
    setUserCountries(
      userInfo.country && userInfo.repCountry
        ? [
            userInfo.repCountry,
            ...arrayRemovedItem(userInfo.repCountry, userInfo.country),
          ]
        : [SELECT]
    );
  }, [userInfo.country, userInfo.repCountry]);

  useEffect(() => {
    setUserHopeLanguages(
      userInfo.hopeLanguage && userInfo.repHopeLanguage
        ? [
            userInfo.repHopeLanguage,
            ...arrayRemovedItem(
              userInfo.repHopeLanguage,
              userInfo.hopeLanguage
            ),
          ].map((item) => LocaleLanguage[item])
        : [SELECT]
    );
  }, [userInfo.hopeLanguage, userInfo.repHopeLanguage]);

  useEffect(() => {
    setUserFaceBookUrl(userInfo.facebookUrl);
  }, [userInfo.facebookUrl]);

  useEffect(() => {
    setUserInstagramUrl(userInfo.instagramUrl);
  }, [userInfo.instagramUrl]);

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
            type={COUNTRY_TYPE}
            count={2}
            setValues={setUserCountries}
            values={userCountries}
          />
          <ProfileSelectInfo
            title="유저의 선택 언어"
            description="유저의 선택언어를 관리합니다. (최대 4개) 가장 첫 칸은 대표 언어로 표시됩니다. "
            type={LANGUAGE_TYPE}
            count={4}
            setValues={setUserLanguages}
            values={userLanguages}
          />
          <ProfileSelectInfo
            title="유저의 선택 희망 언어"
            description="유저의 선택 희망언어를 관리합니다. (최대 4개) 가장 첫 칸은 주 언어로 표시됩니다."
            type={LANGUAGE_TYPE}
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
export default React.memo(ManageUserDetail);

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
