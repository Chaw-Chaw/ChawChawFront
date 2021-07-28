import styled, { css } from "styled-components";
import Image from "next/image";

interface ImageSectionProps {
  src: StaticImageData;
  alt: string;
}

const ImageWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin: 50px 50px;
`;

const ImageSection: React.FC<ImageSectionProps> = (props) => {
  return (
    <ImageWrapper>
      <Image src={props.src} alt={props.alt} objectFit="contain"></Image>
    </ImageWrapper>
  );
};

export { ImageSection };
