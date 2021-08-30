import styled from "styled-components";
import { PostModalInfoListBox, PostModalInfoTitle } from "./PostModalInfoList";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

const PostModalSocialList: React.FC<{
  title: string;
  faceBookUrl: string;
  instagramUrl: string;
}> = (props) => {
  return (
    <PostModalInfoListBox>
      <PostModalInfoTitle>{props.title}</PostModalInfoTitle>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <PostModalSocialUrlBox type={"facebook"}>
          <FaFacebook />
          <PostModalSocialUrlText href={props.faceBookUrl}>
            {props.faceBookUrl}
          </PostModalSocialUrlText>
        </PostModalSocialUrlBox>
        <PostModalSocialUrlBox type={"instagram"}>
          <AiFillInstagram />
          <PostModalSocialUrlText href={props.instagramUrl}>
            {props.instagramUrl}
          </PostModalSocialUrlText>
        </PostModalSocialUrlBox>
      </div>
    </PostModalInfoListBox>
  );
};

export { PostModalSocialList };

const PostModalSocialUrlBox = styled.div<{ type: string }>`
  display: flex;
  font-size: 1.4rem;
  width: 100%;
  align-items: center;
  svg {
    width: 20px;
    height: 20px;
    color: ${(props) => (props.type === "facebook" ? "#3d5a97" : "#eb559b")};
  }
`;
const PostModalSocialUrlText = styled.a`
  text-decoration: none;
  color: ${(props) => (props.theme.id === "light" ? "black" : "white")};
  font-size: 1rem;
  margin-left: 10px;
`;
