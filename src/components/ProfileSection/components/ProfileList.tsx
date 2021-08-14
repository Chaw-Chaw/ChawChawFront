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
  setValues?: Dispatch<SetStateAction<string[]>>;
  values?: string[];
}

interface ProfileSelectInfoProps extends ProfileListProps {
  type: string;
  count: number;
}
interface ProfileSocialUrlProps extends ProfileListProps {
  type?: string;
  setFaceBookUrl?: Dispatch<SetStateAction<string>>;
  setInstagramUrl?: Dispatch<SetStateAction<string>>;
  setUrl?: Dispatch<SetStateAction<string>>;
  faceBookUrl?: string;
  instagramUrl?: string;
  url?: string;
}
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
  const AddButton = () => {
    console.log(props.values, "before");
    if (props.setValues && props.values) {
      if (props.values[props.values.length - 1] !== "") {
        props.setValues((preState) => {
          return [...preState, ""];
        });
        // console.log(props.values, "after");
      }
    }
  };
  const RemoveButton = () => {
    // 왜 두개 이상의 배열에서 갑자기 한개로 줄어들까?
    if (props.setValues) {
      props.setValues((preState) => {
        preState.pop();

        console.log(preState, "removeButton");
        return [...preState];
      });
    }
  };
  const colors = ["#06C074", "#5A65E8", "#4BC6DA"];

  return (
    <ProfileList title={props.title} description={props.description}>
      <ButtonsBox>
        {props.values &&
          Object.values(props.values).map((item, index) => {
            if (index === 0) {
              return (
                <DropDownMainBox key={index}>
                  <DropDownMainText>main</DropDownMainText>
                  <SelectInfoDropDown
                    index={index}
                    type={props.type}
                    backgroundColor={colors[index % 3]}
                    initialValue={item}
                    setValues={props.setValues}
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
                  initialValue={item}
                  setValues={props.setValues}
                />
              </DropDownBox>
            );
          })}

        {(() => {
          if (props.values) {
            const valuesLength = Object.values(props.values).length;
            if (valuesLength === 0)
              return <ControlBtnButton onClick={AddButton}>+</ControlBtnButton>;
            else if (valuesLength > 0 && valuesLength < props.count)
              return (
                <ControlBtnButtonContainer>
                  <AddControlBtnButton onClick={AddButton}>
                    +
                  </AddControlBtnButton>
                  <RemoveControlBtnButton onClick={RemoveButton}>
                    -
                  </RemoveControlBtnButton>
                </ControlBtnButtonContainer>
              );
            else
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
const SocialUrl: React.FC<ProfileSocialUrlProps> = (props) => {
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
        value={
          props.url
            ? props.url
            : props.type === "facebook"
            ? "https://www.facebook.com/"
            : "https://www.instagram.com/"
        }
        defaultValue={
          props.type === "facebook"
            ? "https://www.facebook.com/"
            : "https://www.instagram.com/"
        }
      />
      <UrlUpdateButton
        onClick={() => {
          setIsActive((isActive) => !isActive);
          const url = urlRef.current;
          if (urlRef === null || url === null) return;
          if (isActive && props.setUrl && url) {
            props.setUrl(() => {
              return url.value;
            });
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
        <SocialUrl
          type="facebook"
          setUrl={props.setFaceBookUrl}
          url={props.faceBookUrl}
        />
        <SocialUrl
          type="instagram"
          setUrl={props.setInstagramUrl}
          url={props.instagramUrl}
        />
      </div>
    </ProfileList>
  );
};
export { ProfileList, ProfileSelectInfo, ProfileSocialUrl };
