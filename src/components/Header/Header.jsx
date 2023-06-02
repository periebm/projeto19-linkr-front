import styled from "styled-components";
import arrowImg from "../../assets/icons/arrow.svg";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar";
import jwtDecode from "jwt-decode";

export default function Header(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pictureUrl, setPictureUrl] = useState("");
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  const handleArrowClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setPictureUrl(JSON.parse(userInfo).pictureUrl);
    }

    const handleOutsideClick = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.body.addEventListener("click", handleOutsideClick);

    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  function logout() {
    localStorage.removeItem("userInfo");
    navigate("/");
  }

  return (
    <HeaderContainer>
      <Logo>linkr</Logo>
      <SearchBar />
      <MenuContainer ref={menuRef}>
        <ArrowImg src={arrowImg} alt="" onClick={handleArrowClick} isMenuOpen={isMenuOpen} />
        <AvatarImg src={pictureUrl} alt="" onClick={handleArrowClick} />
      </MenuContainer>
      <LogoutButton onClick={logout} isMenuOpen={isMenuOpen} ref={buttonRef}>
        Logout
      </LogoutButton>
    </HeaderContainer>
  );
}

const LogoutButton = styled.button`
  z-index: -5;
  position: absolute;
  top: ${({ isMenuOpen }) => (isMenuOpen ? "60px" : "0")};
  transition: top 0.3s ease-in-out;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  min-width: 100px;
  border: none;
  cursor: pointer;
  border-bottom-left-radius: 20px;
  height: 50px;
  background-color: #151515;

  font-family: Lato;
  font-size: 17px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0.05em;
  color: #ffffff;
`;

const ArrowImg = styled.img`
  cursor: pointer;

  transform: ${({ isMenuOpen }) => (isMenuOpen ? "rotate(180deg)" : "none")};
  transition: transform 0.3s ease-in-out;
`;

const AvatarImg = styled.img`
  object-fit: cover;
  width: 5vh;
  height: 5vh;
  border-radius: 50%;
  cursor: pointer;
`;

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 5vw;
  min-width: 130px;
  gap: 15px;
  background-color: #151515;
  padding-right: 30px;
`;

const Logo = styled.h2`
  font-family: Passion One;
  font-size: 49px;
  font-weight: 700;
  line-height: 54px;
  letter-spacing: 0.05em;
  text-align: left;
  color: #ffffff;
`;

const HeaderContainer = styled.div`
  z-index: 4;
  padding-left: 30px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: #151515;
  width: 100vw;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
