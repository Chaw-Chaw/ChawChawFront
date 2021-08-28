import Image from "next/image";
import styled from "styled-components";

const PostModalImage: React.FC<{ src: string }> = (props) => {
  return (
    <PostModalImageSection>
      <PostModalImageHeadSection />
      <PostModalImageBox>
        <Image
          src={props.src}
          alt="프로필 이미지"
          width="200"
          height="200"
          objectFit="cover"
          className="post-modal-image"
        />
      </PostModalImageBox>
    </PostModalImageSection>
  );
};

export { PostModalImage };

const PostModalImageSection = styled.div`
  width: 100%;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const PostModalImageHeadSection = styled.div`
  width: 100%;
  height: 150px;
  background-color: ${(props) => props.theme.primaryColor};
`;

const PostModalImageBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 200px;
  width: 200px;
  border-radius: 50%;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.5);
  border: 10px solid ${(props) => props.theme.primaryColor};
  .post-modal-image {
    border-radius: 50%;
  }
`;
