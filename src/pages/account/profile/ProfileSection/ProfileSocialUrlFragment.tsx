import { Dispatch, SetStateAction, useRef, useState } from "react";
import {
  DEFAULT_FACEBOOK_URL,
  DEFAULT_INSTAGRAM_URL,
} from "../../../../constants";
import {
  ProfileListItem,
  ProfileListItemProps,
} from "../../../../components/profile/ProfileListItem";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import styled from "styled-components";
import { Input, UpdateButton } from "../../../../components/common";

interface ProfileSocialUrlFragmentProps {
  type?: string;
  url?: string;
  setUrl?: Dispatch<SetStateAction<string>>;
}

const ProfileSocialUrlFragment: React.FC<ProfileSocialUrlFragmentProps> = (
  props
) => {
  const [isActive, setIsActive] = useState(false);
  const urlRef = useRef<HTMLInputElement>(null);
  const defaultUrl =
    props.type === "facebook" ? DEFAULT_FACEBOOK_URL : DEFAULT_INSTAGRAM_URL;
  return (
    <ProfileSocialUrlBox key={props.url} type={props.type}>
      {props.type === "facebook" ? <FaFacebook /> : <AiFillInstagram />}
      <ProfileSocialUrlInput
        isActive={isActive}
        disabled={!isActive}
        ref={urlRef}
        defaultValue={props.url || defaultUrl}
      />
      <UrlUpdateButton
        onClick={(e) => {
          e.preventDefault();
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
    </ProfileSocialUrlBox>
  );
};

export { ProfileSocialUrlFragment };
export type { ProfileSocialUrlFragmentProps };

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
