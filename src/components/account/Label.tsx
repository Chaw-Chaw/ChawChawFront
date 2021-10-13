import styled from "styled-components";

interface LabelProps {
  tag?: string;
  htmlFor?: string;
}

const Label: React.FC<LabelProps> = (props) => {
  return (
    <Box>
      <MainLabel htmlFor={props.htmlFor}>{props.children}</MainLabel>
      {props.tag ? <Tag>{props.tag}</Tag> : null}
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
