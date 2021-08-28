import Image from "next/image";
import styled from "styled-components";

const MessageImage: React.FC<{ src: string }> = (props) => {
  return (
    <ImageBox>
      <Image
        src={props.src}
        alt="메세지 보낸이 이미지"
        width="50px"
        height="50px"
        objectFit="cover"
        className="message-sender-image"
      />
    </ImageBox>
  );
};

export { MessageImage };

const ImageBox = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);

  .message-sender-image {
    border-radius: 100%;
  }
`;
