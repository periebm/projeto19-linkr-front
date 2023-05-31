import styled from "styled-components";
import ReactModal from "react-modal";


export const DialogContainer = styled.div`
    height: 80vh;
    width: 80vw;
    background-color: green;
    
`

export const StyledMod = styled(ReactModal)`
    background-color: blue;
    height: 262px;
    width: 597px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    background-color: #333333;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding: 0 130px;
    border-radius: 50px;
    border: none;
    h1{
        font-family: 'Lato', sans-serif;
        color: white;
        font-weight: 700;
        font-size: 25px;
        line-height: 41px;
        text-align: center;
    }

    @media (max-width: 768px) {
        width: 90%;
        padding: 0 40px;
        h1{
            font-weight: 700;
            font-size: 20px;
            line-height: 30px;
            text-align: center;
    }
        }

`
export const ButtonContainers = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
`

export const Button = styled.button`
        border: none;
        border-radius: 5px;
        font-family: 'Lato', sans-serif;
        font-weight: 700;
        font-size: 18px;
        padding: 8px 20px;
        color: ${(props)=> props.ft_color};
        background-color: ${(props)=> props.bg_color};
        :hover{
            cursor: pointer;
            transform: scale(1.08);
        }

        @media (max-width: 768px) {
            padding: 8px 10px;
            font-size: 15px;
        }

`