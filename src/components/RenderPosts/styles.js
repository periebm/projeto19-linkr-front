import { FaTrash } from 'react-icons/fa';
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
`