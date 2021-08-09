import styled from "styled-components";
import {
  ProfileContent,
  ProfileImage,
  ProfileSelectInfo,
  ProfileSocialUrl,
} from "./components/";
import { Button, Message } from "../common";
import { useForm, SubmitHandler } from "react-hook-form";
import { ChangeEvent, useContext, useState } from "react";
import { AuthContext } from "../../store/AuthContext";
import { useAlert } from "react-alert";
import axios from "axios";
import { AiOutlineConsoleSql } from "react-icons/ai";
interface ProfileSection {
  title?: string;
  content?: string;
}

type Inputs = {};

const Container = styled.form`
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

const ProfileSection: React.FC = () => {
  const message = useAlert();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const { signup, updateUser, user } = useContext(AuthContext);
  const [userCountries, setUserCountries] = useState<string[]>();
  const [userLanguages, setUserLanguages] = useState<string[]>();
  const [userHopeLanguages, setUserHopeLanguages] = useState<string[]>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {};
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
    <Container onSubmit={handleSubmit(onSubmit)}>
      <ProfileHeader>
        <ProfileImage onChange={imageUpload} onClick={() => deleteImage()} />
        <ProfileContent
          title="포스팅에 올라갈 당신의 매력을 어필해보세요!"
          placeholder="당신을 소개할 내용을 입력해주세요."
          update={updateUser}
        />
      </ProfileHeader>
      <ProfileInfoBox>
        <ProfileSelectInfo
          title="Mother Country"
          description="자신의 국적을 추가해주세요. (최대 2개) 가장 첫 칸은 주 국적으로 표시됩니다. "
          type="country"
          count={2}
          setValues={setUserCountries}
          values={user?.country}
        />
        <ProfileSelectInfo
          title="Language you can"
          description="자신이 할 수 있는 언어를 추가해주세요. (최대 4개) 가장 첫 칸은 주 언어로 표시됩니다. "
          type="language"
          count={4}
          setValues={setUserLanguages}
          values={user?.language}
        />
        <ProfileSelectInfo
          title="Learning lanugage"
          description="배우고 싶은 언어를 모두 추가해주세요. (최대 4개) 가장 첫 칸은 주 언어로 표시됩니다."
          type="hopeLanguage"
          count={4}
          setValues={setUserHopeLanguages}
          values={user?.hopeLanguage}
        />
        <ProfileSocialUrl />
      </ProfileInfoBox>
      <ProfileUploadButton type="submit">프로필 업로드</ProfileUploadButton>
    </Container>
  );
};

export default ProfileSection;
