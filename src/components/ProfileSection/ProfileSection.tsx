import styled from "styled-components";
import {
  ProfileContent,
  ProfileImage,
  ProfileSelectInfo,
  ProfileSocialUrl,
} from "./components/";
import { Button, Message, LanguageLocale, LocaleLanguage } from "../common";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  ChangeEvent,
  MouseEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContext, UserPropertys } from "../../store/AuthContext";
import { useAlert } from "react-alert";
import axios from "axios";
import { AiOutlineConsoleSql } from "react-icons/ai";
import { Router, useRouter } from "next/router";
import { prepareProfile } from "selenium-webdriver/firefox";

interface ProfileSection {
  title?: string;
  content?: string;
}

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

const ProfileSection: React.FC = () => {
  const message = useAlert();
  const router = useRouter();
  const [user, setUser] = useState<UserPropertys>({});
  const { updateUser } = useContext(AuthContext);
  const [userCountries, setUserCountries] = useState<string[]>(
    user.country || []
  );
  const [userLanguages, setUserLanguages] = useState<string[]>(
    user.language ? user.language.map((item) => LocaleLanguage[item]) : []
  );
  const [userHopeLanguages, setUserHopeLanguages] = useState<string[]>(
    user.hopeLanguage
      ? user.hopeLanguage.map((item) => LocaleLanguage[item])
      : []
  );
  const [userContent, setUserContent] = useState<string>(user.content || "");
  const [userFaceBookUrl, setUserFaceBookUrl] = useState<string>(
    user.facebookUrl || "https://www.facebook.com/"
  );
  const [userInstagramUrl, setUserInstagramUrl] = useState<string>(
    user.instagramUrl || "https://www.instagram.com/"
  );

  useEffect(() => {
    const localStorageUser = window.localStorage.getItem("user");

    if (localStorageUser) {
      const localUser: UserPropertys = JSON.parse(localStorageUser);
      const isLogin = localUser.token;

      if (!isLogin) {
        message.error("로그인 후 이용해주세요.", {
          onClose: () => {
            router.push("/account/login");
          },
        });
      }
      setUser((pre) => {
        return { ...pre, ...localUser };
      });
      console.log(localUser, "userLanguages");
      setUserContent(localUser.content || "");

      setUserFaceBookUrl(localUser.facebookUrl || "https://www.facebook.com/");
      setUserInstagramUrl(
        localUser.instagramUrl || "https://www.instagram.com/"
      );
      setUserCountries(localUser.country || []);
      setUserLanguages(
        localUser.language
          ? localUser.language.map((item) => LocaleLanguage[item])
          : []
      );
      setUserHopeLanguages(
        localUser.hopeLanguage
          ? localUser.hopeLanguage.map((item) => LocaleLanguage[item])
          : []
      );
    }
  }, []);

  const onSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    console.log(userCountries, "확인");
    const country = userCountries.map((item, index) => {
      if (item === "") return item;
      const regex =
        /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
      let countryName = item.replace(regex, "");
      if (countryName[0] === " ") countryName = countryName.substring(1);
      return countryName;
    });

    const language = userLanguages.map((item) => {
      if (item === "") return item;
      return LanguageLocale[item];
    });
    const hopeLanguage = userHopeLanguages.map((item) => {
      if (item === "") return item;
      return LanguageLocale[item];
    });

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
    await axios
      .post("/users/profile", userProfile, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${user?.token}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        if (!res.data.isSuccess) {
          throw new Error(res.data);
          return false;
        }
        message.success("프로필이 업로드 되었습니다.");
        return res.data.data;
      })
      .then((res) => updateUser(userProfile))
      .catch((err) => console.error(err));
  };
  const sendImage = async (image: FormData) => {
    await axios
      .post("/users/image", image, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${user?.token}`,
          // Accept: "application/json",
        },
      })
      .then((res) => {
        if (res.data.isSuccess) {
          message.success("이미지 업로드 성공!");
          console.log(res.data, "image Upload");
          return res.data.data;
        } else {
          throw new Error(res.data);
        }
      })
      .then((res) => {
        updateUser({ imageUrl: res });
        return res;
      })
      .catch((err) => console.error(err.responseMessage));
  };

  const imageUpload = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    // const file = target.files[0];
    if (file !== undefined) {
      if (file.size > 1024 * 1024 * 5) {
        message.error("5MB 이상 파일을 업로드 할 수 없습니다.");
        return;
      }
      // setUserImage(file);
      const image = new FormData();

      image.append("file", file);
      sendImage(image);
    }
  };

  const deleteImage = async () => {
    const response = await axios
      .delete("/users/image", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${user?.token}`,
          Accept: "*/*",
        },
      })
      .then((res) => {
        updateUser({ imageUrl: res.data.data });
        return res;
      });
    console.log(response);
  };

  return (
    <Container>
      <ProfileHeader>
        <ProfileImage onChange={imageUpload} onClick={() => deleteImage()} />
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
