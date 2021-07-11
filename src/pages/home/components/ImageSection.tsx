import styled, { css } from "styled-components";
import Image from "next/image";

interface ImageSectionProps {
  src: StaticImageData;
  alt: string;
}

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 10% 7%;
`;

const ImageSection: React.FC<ImageSectionProps> = (props) => {
  return (
    <ImageWrapper>
      <Image src={props.src} alt={props.alt} layout="intrinsic"></Image>
    </ImageWrapper>
  );
};

export { ImageSection };
