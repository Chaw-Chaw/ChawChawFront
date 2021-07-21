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
  .image {
    object-fit: contain;
  }
`;

const ImageSection: React.FC<ImageSectionProps> = (props) => {
  return (
    <ImageWrapper>
      <Image src={props.src} alt={props.alt} className="image"></Image>
    </ImageWrapper>
  );
};

export { ImageSection };
