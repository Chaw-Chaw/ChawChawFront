import Image from "next/image";
import styled from "styled-components";
import React from "react";

const MMessageImage: React.FC<{ src: string; children?: React.ReactNode }> = (
  props
) => {
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
      {props.children}
    </ImageBox>
  );
};
const MessageImage = React.memo(MMessageImage);

export { MessageImage };

const ImageBox = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);
  position: relative;
  .message-sender-image {
    border-radius: 100%;
  }
`;
