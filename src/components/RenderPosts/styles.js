import { FaTrash, FaPencilAlt } from 'react-icons/fa';
import styled from "styled-components";
import { IoHeartOutline, IoHeart } from "react-icons/io5";

export const StyledTrash = styled(FaTrash)`
    color: white;
    position: absolute;
    top: 8px;
    right: 5px;

    :hover{
        cursor: pointer;
        transform: scale(1.2);
    }
`;

export const StyledPencil = styled(FaPencilAlt)`
    color: white;
    position: absolute;
    top: 8px;
    right: 35px;

    :hover{
        cursor: pointer;
        transform: scale(1.2);
    }
`;

export const EditInput = styled.input`
  margin:10px 0;
  color: #4C4C4C;
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 17px;
  padding:5px;
  border-radius:7px;
  border:0;
`;

export const LikeContainer = styled.div`
    min-width: 50px;
    min-height: 50px;
    position: absolute;
    top: 69px;
    left: 17px;
    display:flex;
    align-items: center;
    flex-direction: column;
    p{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        line-height: 13px;
        text-align: center;
        margin-top: 2px;
        color: #FFFFFF;
    }
    button{
        all: unset;
    }
`

export const ProfilePicture = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    background-color: blue;
    background-image: url(${props => props.pictureUrl});
    background-size: cover;
    background-position: center;
    position: absolute;
    left: 17px;
`;
export const ProfilePictureContainer = styled.div`
    width: 86px;
    height: 209px;
    display:flex;
    position: relative;
`

export const HeartOutline = styled(IoHeartOutline)`
    color: white;
    font-size: 25px;
`
export const FilledHeart = styled(IoHeart)`
    color: red;
    font-size: 25px;
`