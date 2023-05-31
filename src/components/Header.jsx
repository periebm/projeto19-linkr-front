import styled from "styled-components";

export default function Header() {
  return <HeaderContainer></HeaderContainer>;
}

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: red;
  width: 100vw;
  height: 10vh;
`;
