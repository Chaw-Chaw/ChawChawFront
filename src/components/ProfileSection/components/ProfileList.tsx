import React, {
  useState,
  useRef,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import styled from "styled-components";
import { Button, SelectInfoDropDown, Input, UpdateButton } from "../../common";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { AuthContext } from "../../../store/AuthContext";

interface ProfileListProps {
  title?: string;
  description?: string;
  setValues?: Dispatch<SetStateAction<string[] | undefined>>;
}

interface ProfileSelectInfoProps extends ProfileListProps {
  type: string;
  count: number;
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
const ProfileTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  width: 200px;
  @media (max-width: 768px) {
    margin-bottom: 0px;
  }
`;

const ListHeader = styled.div`
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ProfileDescription = styled.span`
  font-size: 1rem;
  color: ${(props) =>
    props.theme.id === "light" ? "rgb(0, 0, 0, 0.5)" : "white"};
`;

const ProfileList: React.FC<ProfileListProps> = (props) => {
  return (
    <Container>
      <ListHeader>
        <ProfileTitle>{props.title}</ProfileTitle>
        {props.children}
      </ListHeader>
      <ProfileDescription>{props.description}</ProfileDescription>
    </Container>
  );
};

const ControlBtnButton = styled(Button)`
  width: 80px;
  font-size: 1.5rem;
  text-align: center;
`;

const ControlBtnButtonContainer = styled.div`
  width: 80px;
  height: 30px;
  display: flex;
  margin: 0px 0px;
`;
const AddControlBtnButton = styled(ControlBtnButton)`
  width: 100%;

  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
`;
const RemoveControlBtnButton = styled(ControlBtnButton)`
  width: 100%;

  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
`;

const ButtonsBox = styled.div`
  margin: 15px 5px 15px 5px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;
const DropDownBox = styled.div`
  margin-right: 5px;
`;

const DropDownMainBox = styled(DropDownBox)`
  padding: 5px;
  border-radius: 20rem;
  position: relative;

  border: 2px solid ${(props) => props.theme.primaryColor};
`;

const DropDownMainText = styled.div`
  padding: 0px 10px;
  color: ${(props) => props.theme.primaryColor};
  position: absolute;
  top: -15px;
  left: 50%;
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  transform: translateX(-50%);
`;

const ProfileSelectInfo: React.FC<ProfileSelectInfoProps> = (props) => {
  const [buttonCount, setButtonCount] = useState<number[]>([]);
  const [values, setValues] = useState<string[]>(["", "", "", ""]);
  const AddButton = () => {
    if (buttonCount.length >= props.count) {
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
          if (index === 0) {
            return (
              <DropDownMainBox key={index}>
                <DropDownMainText>main</DropDownMainText>
                <SelectInfoDropDown
                  index={index}
                  type={props.type}
                  backgroundColor={colors[index % 3]}
                />
              </DropDownMainBox>
            );
          }
          return (
            <DropDownBox key={index}>
              <SelectInfoDropDown
                index={index}
                type={props.type}
                backgroundColor={colors[index % 3]}
              />
            </DropDownBox>
          );
        })}

        {(() => {
          if (buttonCount.length === 0)
            return <ControlBtnButton onClick={AddButton}>+</ControlBtnButton>;
          if (buttonCount.length > 0 && buttonCount.length < props.count)
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
  justify-content: start;
  align-items: center;
  margin: 10px 0px;
  width: 450px;
  @media (max-width: 500px) {
    width: 270px;
  }
`;
const SocialUrlInput = styled(Input)<{ isActive?: boolean }>`
  border: ${(props) => (props.isActive ? "2px solid orange" : "none")};
  height: 20px;
  font-size: 0.8rem;
  margin: 0px 10px;
  width: 100%;
`;
const UrlUpdateButton = styled(UpdateButton)`
  width: 40px;
  padding: 0px;
`;
const SocialUrl: React.FC<{ type?: string }> = (props) => {
  const [isActive, setIsActive] = useState(false);
  const urlRef = useRef<HTMLInputElement>(null);
  const { updateUser } = useContext(AuthContext);

  return (
    <SocialUrlBox>
      {props.type === "facebook" ? <FaFacebook /> : <AiFillInstagram />}
      <SocialUrlInput
        isActive={isActive}
        disabled={!isActive}
        ref={urlRef}
        defaultValue={
          props.type === "facebook"
            ? "https://www.instagram.com/"
            : "https://www.facebook.com/"
        }
      />
      <UrlUpdateButton
        onClick={() => {
          setIsActive((isActive) => !isActive);
          if (urlRef === null || urlRef.current === null) return;
          if (isActive) {
            props.type === "facebook"
              ? updateUser({ facebookUrl: urlRef.current.value })
              : updateUser({ instagramUrl: urlRef.current.value });
          }
        }}
      >
        {isActive ? "업데이트" : "수정"}
      </UrlUpdateButton>
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
