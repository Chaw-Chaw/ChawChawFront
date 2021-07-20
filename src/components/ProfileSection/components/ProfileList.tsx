import React, { useState } from "react";
import styled from "styled-components";
import { Button, SelectInfoDropDown, Input, UpdateButton } from "../../common";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

interface ProfileListProps {
  title?: string;
  description?: string;
}

interface ProfileSelectInfoProps extends ProfileListProps {
  type: string;
}
interface ProfileSocialUrlProps extends ProfileListProps {}
const Container = styled.div`
  display: flex;
  padding-bottom: 20px;
  border-bottom: 1px solid
    ${(props) => (props.theme.id === "light" ? "rgb(0, 0, 0, 0.2)" : "white")};
  width: 100%;
  align-items: center;
  flex-direction: column;
  align-items: flex-start;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
const Title = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  width: 200px;
  @media (max-width: 768px) {
    margin-bottom: 0px;
  }
`;

const ListHeader = styled.div`
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Description = styled.span`
  font-size: 1rem;
  color: ${(props) =>
    props.theme.id === "light" ? "rgb(0, 0, 0, 0.5)" : "white"};
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const ProfileList: React.FC<ProfileListProps> = (props) => {
  return (
    <Container>
      <ListHeader>
        <Title>{props.title}</Title>
        {props.children}
      </ListHeader>
      <Description>{props.description}</Description>
    </Container>
  );
};

const ControlBtnButton = styled(Button)`
  width: 80px;
  font-size: 1.5rem;
  text-align: center;
  margin: 0px 5px;
`;

const ControlBtnButtonContainer = styled.div`
  width: 80px;
  height: 30px;
  display: flex;
  margin: 0px 5px;
`;
const AddControlBtnButton = styled(ControlBtnButton)`
  width: 100%;
  margin: 0px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
`;
const RemoveControlBtnButton = styled(ControlBtnButton)`
  width: 100%;
  margin: 0px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
`;

const ButtonsBox = styled.div`
  margin: 15px 5px 0px 5px;
  display: flex;
`;
const DropDownBox = styled.div`
  margin: 0px 5px;
`;

const ProfileSelectInfo: React.FC<ProfileSelectInfoProps> = (props) => {
  const [buttonCount, setButtonCount] = useState<number[]>([]);

  const AddButton = () => {
    if (buttonCount.length >= 4) {
      return;
    }
    setButtonCount((buttonCount) => {
      return [...buttonCount, 1];
    });
  };
  const RemoveButton = () => {
    if (buttonCount.length === 0) {
      return;
    }
    const newButtonCount = [...buttonCount];
    newButtonCount.pop();
    setButtonCount((buttonCount) => {
      return newButtonCount;
    });
  };
  const colors = ["#06C074", "#5A65E8", "#4BC6DA"];

  return (
    <ProfileList title={props.title} description={props.description}>
      <ButtonsBox>
        {buttonCount.map((_, index) => {
          return (
            <DropDownBox key={index}>
              <SelectInfoDropDown type={props.type} color={colors[index % 3]} />
            </DropDownBox>
          );
        })}

        {(() => {
          if (buttonCount.length === 0)
            return <ControlBtnButton onClick={AddButton}>+</ControlBtnButton>;
          if (buttonCount.length > 0 && buttonCount.length < 4)
            return (
              <ControlBtnButtonContainer>
                <AddControlBtnButton onClick={AddButton}>+</AddControlBtnButton>
                <RemoveControlBtnButton onClick={RemoveButton}>
                  -
                </RemoveControlBtnButton>
              </ControlBtnButtonContainer>
            );
          else {
            return (
              <ControlBtnButton onClick={RemoveButton}>-</ControlBtnButton>
            );
          }
        })()}
      </ButtonsBox>
    </ProfileList>
  );
};

const SocialUrlBox = styled.div`
  display: flex;
  font-size: 1.5rem;
  width: 450px;
  justify-content: start;
  align-items: center;
  margin: 10px 0px;
`;
const SocialUrlInput = styled(Input)<{ isActive?: boolean }>`
  border: ${(props) => (props.isActive ? "2px solid orange" : "none")};
  height: 20px;
  font-size: 0.8rem;
  max-width: 300px;
  margin: 0px 10px;
`;

const SocialUrl: React.FC<{ type?: string }> = (props) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <SocialUrlBox>
      {props.type === "facebook" ? <FaFacebook /> : <AiFillInstagram />}
      <SocialUrlInput
        isActive={isActive}
        disabled={!isActive}
        defaultValue={
          props.type === "facebook"
            ? "https://www.instagram.com/"
            : "https://www.facebook.com/"
        }
      />
      <UpdateButton onClick={() => setIsActive((isActive) => !isActive)}>
        {isActive ? "업데이트" : "수정"}
      </UpdateButton>
    </SocialUrlBox>
  );
};

const ProfileSocialUrl: React.FC<ProfileSocialUrlProps> = (props) => {
  return (
    <ProfileList
      title="Social Network"
      description="당신의 SNS를 공유해주세요."
    >
      <div
        style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}
      >
        <SocialUrl type="facebook" />
        <SocialUrl type="instagram" />
      </div>
    </ProfileList>
  );
};
export { ProfileList, ProfileSelectInfo, ProfileSocialUrl };
