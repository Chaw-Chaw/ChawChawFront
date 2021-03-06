import styled from "styled-components";
import {
  Button,
  CountryLocale,
  LanguageLocale,
  LocaleLanguage,
} from "../../common";
import React, { MouseEventHandler, useState } from "react";
import {
  DEFAULT_FACEBOOK_URL,
  DEFAULT_INSTAGRAM_URL,
  DEFAULT_PROFILE_IMAGE,
  SUCCESS_ALERT,
  SUCCESS_UPLOAD_PROFILE_MSG,
} from "../../../constants";
import ProfileContent from "./ProfileContent";
import ProfileImage from "./ProfileImage";
import ProfileSocialUrl from "./ProfileSocialUrl";
import ProfileSelectInfo from "./ProfileSelectInfo";
import { arrayRemovedItem } from "../../../utils";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { SELECT } from "../../../constants/profile";
import { authActions } from "../../../store/authSlice";
import { uploadProfile } from "../../../store/actions/profileActions";
import { alertActions } from "../../../store/alertSlice";
import { asyncErrorHandle } from "../../../store/actions/alertActions";

const ProfileSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const [userCountries, setUserCountries] = useState<string[]>(
    user.country && user.repCountry
      ? [user.repCountry, ...arrayRemovedItem(user.repCountry, user.country)]
      : [SELECT]
  );
  const [userLanguages, setUserLanguages] = useState<string[]>(
    user.language && user.repLanguage
      ? [
          user.repLanguage,
          ...arrayRemovedItem(user.repLanguage, user.language),
        ].map((item) => LocaleLanguage[item])
      : [SELECT]
  );
  const [userHopeLanguages, setUserHopeLanguages] = useState<string[]>(
    user.hopeLanguage && user.repHopeLanguage
      ? [
          user.repHopeLanguage,
          ...arrayRemovedItem(user.repHopeLanguage, user.hopeLanguage),
        ].map((item) => LocaleLanguage[item])
      : [SELECT]
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
      throw new Error("????????? ???????????? ?????? ?????? ??????????????????.");
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

    await dispatch(uploadProfile(userProfile));
    return userProfile;
  };

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    try {
      const userProfile = await onSubmit();
      dispatch(authActions.updateUser(userProfile));
      dispatch(
        alertActions.updateAlert({
          name: SUCCESS_ALERT,
          message: SUCCESS_UPLOAD_PROFILE_MSG,
        })
      );
    } catch (error) {
      dispatch(asyncErrorHandle(error));
    }
  };

  return (
    <Container>
      <ProfileHeader>
        <ProfileImage />
        <ProfileContent
          title="???????????? ????????? ????????? ????????? ??????????????????!"
          placeholder="????????? ????????? ????????? ??????????????????."
          setValues={setUserContent}
          values={userContent}
          name={user.name}
        />
      </ProfileHeader>
      <ProfileInfoBox>
        <ProfileSelectInfo
          title="Mother Country"
          type="country"
          description="????????? ????????? ??????????????????. (?????? 2???) ?????? ??? ?????? ??? ???????????? ???????????????. "
          count={2}
          setValues={setUserCountries}
          values={userCountries}
        />
        <ProfileSelectInfo
          title="Language you can"
          type="language"
          description="????????? ??? ??? ?????? ????????? ??????????????????. (?????? 4???) ?????? ??? ?????? ??? ????????? ???????????????. "
          count={4}
          setValues={setUserLanguages}
          values={userLanguages}
        />
        <ProfileSelectInfo
          title="Learning lanugage"
          type="language"
          description="????????? ?????? ????????? ?????? ??????????????????. (?????? 4???) ?????? ??? ?????? ??? ????????? ???????????????."
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
        ????????? ?????????
      </ProfileUploadButton>
    </Container>
  );
};

export default React.memo(ProfileSection);

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
