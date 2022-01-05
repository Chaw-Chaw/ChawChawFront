import styled from "styled-components";
import { LabelProps } from "../../types/account";

const Label: React.FC<LabelProps> = (props) => {
  const tag = props.tag ? <Tag>{props.tag}</Tag> : null;

  return (
    <Box>
      <MainLabel htmlFor={props.htmlFor}>{props.children}</MainLabel>
      {tag}
    </Box>
  );
};

export { Label };

const MainLabel = styled.label`
  font-size: 1.2rem;
  font-weight: 600;
`;

const Tag = styled.span`
  font-size: 1rem;
  color: ${(props) => props.theme.primaryColor};
  font-weight: 500;
`;

const Box = styled.div`
  display: flex;
  align-items: flex-end;
`;
