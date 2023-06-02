import { FaTrash, FaPencilAlt } from 'react-icons/fa';
import styled from "styled-components";

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