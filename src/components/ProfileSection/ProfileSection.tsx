import styled from "styled-components";
import {
  ProfileContent,
  ProfileImage,
  ProfileSelectInfo,
  ProfileSocialUrl,
} from "./components/";
import { Button } from "../common";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
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
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const [userImage, setUserImage] = useState<File>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const formData = new FormData();
    if (userImage) formData.append("image", userImage);
    else {
      console.log(userImage);
    }
  };

  const imageUpload = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    console.log(file);
    if (file !== undefined) {
      setUserImage(file);
    } else {
      console.log("no file");
    }
  };
  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <ProfileHeader>
        <ProfileImage onChange={imageUpload} />
        <ProfileContent
          title="포스팅에 올라갈 당신의 매력을 어필해보세요!"
          content="
        안녕 Army들 ~ 어? 예쁘다. Hi~ 에이치아이~ BTS 언어를 배우고 싶어요 한국에 있는 아미들하고 언어교환해요 
        즐겁게 즐겁게! 나랑 놀사람 얼른 여기로 붙어요!!
        나는 한국인이구 영어랑 프랑스어를 배우고 싶어요!
        185에 마른 근육도 쩔구 노래랑 인기도 대박 많아요 나랑 놀사람~
        유학생들이 bts V를 팔로워 하는게 얼마나 어려운데 이렇게 팬미팅 하는거지 
        어쩌구 저쩌구
        "
        />
      </ProfileHeader>
      <ProfileInfoBox>
        <ProfileSelectInfo
          title="Mother Country"
          description="자신의 국적을 추가해주세요. (최대 2개) 가장 첫 칸은 주 국적으로 표시됩니다. "
          type="country"
          count={2}
        />
        <ProfileSelectInfo
          title="Language you can"
          description="자신이 할 수 있는 언어를 추가해주세요. (최대 4개) 가장 첫 칸은 주 언어로 표시됩니다. "
          type="language"
          count={4}
        />
        <ProfileSelectInfo
          title="Learning lanugage"
          description="배우고 싶은 언어를 모두 추가해주세요. (최대 4개) 가장 첫 칸은 주 언어로 표시됩니다."
          type="language"
          count={4}
        />
        <ProfileSocialUrl />
      </ProfileInfoBox>
      <ProfileUploadButton type="submit">프로필 업로드</ProfileUploadButton>
    </Container>
  );
};

export default ProfileSection;
