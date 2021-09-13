import styled from "styled-components";
import Header from "./Header";

const Layout: React.FC<{ type?: string }> = (props) => {
  // useEffect(() => {
  //   connect(client.current);
  //   return () => disconnect(client.current);
  // }, []);
  return (
    <>
      <Header type={props.type} />
      <Inner>{props.children}</Inner>
    </>
  );
};

const Inner = styled.main`
  margin: 0px auto 0px auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 768px) {
    box-sizing: border-box;
    padding-top: 70px;
  }
`;

export { Layout };
