import styled from "styled-components";
import {DebounceInput} from 'react-debounce-input';

export const InputContainer = styled.div`
    padding: 10px 0;
    width: 35%;
    h1{
        color: greenyellow;
    }
    @media (max-width: 768px) {
        visibility: hidden;
    }
`

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    position: relative;
    width: 100%;
    z-index: 1;
    @media (max-width: 768px) {
        width: 92%;
    }
`

export const StyledInput = styled(DebounceInput)`
    width: 100%;
    height: 45px;
    padding: 10px 16px;
    padding-right: 50px;
    font-size : 19px;
    font-weight: 400;
    font-family: 'Lato', sans-serif;
    border: none;
    border-radius: 8px;
    :focus{
        outline: none;
    }
    ::placeholder{
        color: #C6C6C6;
    }
    @media (max-width: 768px) {
        font-size : 17px;
    }
    `

export const StyledIcon = styled.div`
        position: absolute;
        top: 6px;
        right: 10px;
        color: #C6C6C6;
        font-size: 30px;
        z-index: 1;
    `

export const Dropdown = styled.div`
    position: absolute;
    top: 35px;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #E7E7E7;
    padding: 24px 0px 16px 0;
    border-radius: 0 0 8px 8px;
    visibility: ${(props) => props.showSearch === false ? "hidden" : "visible"};
`

export const DropdownRow = styled.div`
    display: flex;
    align-items: center;
    background-color: #E7E7E7;
    padding: 4px 18px;

    cursor: pointer;
    img{
        height: 39px;
        width: 39px;
        border-radius: 100px;
    }
    h3{
        font-size: 19px;
        color: #515151;
        margin-left: 12px;
        font-family: 'Lato', sans-serif;
    }
    :hover{
        background-color: #1877F2;
    }
    @media (max-width: 768px) {
        h3{
        font-size: 17px;
        }
    }

`
