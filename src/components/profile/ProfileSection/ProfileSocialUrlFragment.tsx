import React, {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useRef,
  useState,
} from "react";
import {
  DEFAULT_FACEBOOK_URL,
  DEFAULT_INSTAGRAM_URL,
} from "../../../constants";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import styled from "styled-components";
import { Input, UpdateButton } from "../../common";
import { ProfileSocialUrlFragmentProps } from "../../../types/profile";
import { TYPE_FACEBOOK } from "../../../constants/profile";
import { FormLabel } from "../../common/FormLabel";

const ProfileSocialUrlFragment: React.FC<ProfileSocialUrlFragmentProps> = (
  props
) => {
  const [isActive, setIsActive] = useState(false);
  const urlRef = useRef<HTMLInputElement>(null);
  const defaultUrl =
    props.type === TYPE_FACEBOOK ? DEFAULT_FACEBOOK_URL : DEFAULT_INSTAGRAM_URL;

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setIsActive((isActive) => !isActive);
    const url = urlRef.current;
    if (urlRef === null || url === null) return;
    if (isActive && props.setUrl && url) {
      props.setUrl(() => {
        return url.value;
      });
    }
  };

  return (
    <ProfileSocialUrlBox key={props.url} type={props.type}>
      {props.type === TYPE_FACEBOOK ? <FaFacebook /> : <AiFillInstagram />}
      <ProfileSocialUrlInput
        id={props.type + "Url"}
        isActive={isActive}
        disabled={!isActive}
        ref={urlRef}
        defaultValue={props.url || defaultUrl}
      />
      <FormLabel id={props.type + "Url"}></FormLabel>
      <UrlUpdateButton onClick={handleClick}>
        {isActive ? "업데이트" : "수정"}
      </UrlUpdateButton>
    </ProfileSocialUrlBox>
  );
};

export default React.memo(ProfileSocialUrlFragment);

const ProfileSocialUrlBox = styled.div<{ type?: string }>`
  display: flex;
  font-size: 1.5rem;
  justify-content: start;
  align-items: center;
  margin: 10px 0px;
  width: 450px;
  @media (max-width: 500px) {
    width: 270px;
  }
  svg {
    color: ${(props) => (props.type === "facebook" ? "#3d5a97" : "#eb559b")};
  }
`;
const ProfileSocialUrlInput = styled(Input)<{ isActive?: boolean }>`
  border: ${(props) => (props.isActive ? "2px solid orange" : "none")};
  height: 20px;
  font-size: 0.8rem;
  margin: 0px 10px;
  width: 100%;
`;

const UrlUpdateButton = styled(UpdateButton)`
  font-family: "BMJUA";
  width: 40px;
  padding: 0px;
`;
