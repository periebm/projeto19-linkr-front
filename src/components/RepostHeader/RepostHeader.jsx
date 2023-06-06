import { useNavigate } from "react-router-dom";
import repostImg from "../../assets/icons/repost.svg";
import styled from "styled-components";

export default function RepostHeader(props) {
  const { reposted_by } = props;
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <StyledRepostHeader>
      <img src={repostImg} alt="" />
      <span>
        Re-posted by{" "}
        <a onClick={() => navigate(`/user/${reposted_by.id}`)}>
          {(reposted_by.id === userInfo.id ? "you" : reposted_by.username)}
        </a>
      </span>
    </StyledRepostHeader>
  );
}

const StyledRepostHeader = styled.div`
  z-index: 0;
  background-color: #1e1e1e;
  position: absolute;
  top: -30px;
  left: 0;
  padding-top: 8px;
  padding-left: 12px;
  width: 611px;
  height: 100px;
  border-radius: 16px;
  display: flex;
  align-items: flex-start;
  img {
    width: 25px;
    margin-right: 6px;
  }
  span {
    color: #ffffff;
    font-family: Lato;
    font-size: 11px;
    font-weight: 400;
    line-height: 13px;
    letter-spacing: 0em;
    text-align: left;
    a {
      font-weight: 700;
      cursor: pointer;
    }
  }
`;
