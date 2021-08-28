import styled from "styled-components";

const Divider = styled.div<{ color?: string; width?: string; height?: string }>`
  background-color: ${(props) => props.color};
  width: ${(props) => (props.width ? props.width : "1px")};
  height: ${(props) => (props.height ? props.height : "1px")};
  margin: 20px 0;
`;

export { Divider };
