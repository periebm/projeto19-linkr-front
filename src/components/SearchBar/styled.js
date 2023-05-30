import styled from "styled-components";

export const InputContainer = styled.div`
    background-color: black;
    padding: 10px 0;
    padding-bottom: 500px;
    h1{
        color: greenyellow;
    }
`

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    position: relative;
    width: 50%;
`

export const StyledInput = styled.input`
    background-color: white;
    width: 100%;
    height: 45px;
    padding: 10px 16px;
    font-size : 19px;
    font-weight: 400;
    border: none;
    border-radius: 8px;
    z-index: 1;
    :focus{
        outline: none;
    }
    ::placeholder{
        color: #C6C6C6;
    }
    `

export const StyledIcon = styled.div`
        position: absolute;
        top: 6px;
        right: 10px;
        color: #C6C6C6;
        font-size: 30px;
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
    visibility: ${(props)=> props.showSearch === false ? "hidden" : "visible"};
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
    }
    :hover{
        background-color: #1877F2;
    }

`
