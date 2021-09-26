import styled from "styled-components";

const ModalLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed; /* Stay in place */
  z-index: 30; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgba(0, 0, 0, 0.5); /* Black w/ opacity */
`;

export { ModalLayout };
