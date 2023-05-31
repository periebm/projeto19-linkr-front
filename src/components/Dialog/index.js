import ReactModal from "react-modal";
import { Button, ButtonContainers, DialogContainer, StyledMod } from "./styled";

export default function DialogBox({ showModal,setShowModal }) {

    return (
        <StyledMod
            isOpen={showModal}
            onRequestClose={()=>setShowModal(false)}
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
            preventScroll={true}
            style={{overlay: {zIndex: 99}}}
        >
            <h1> Are you sure you want to delete this post? </h1>

            <ButtonContainers>
                <Button ft_color={"#1877F2"} bg_color ={"white"}>No, go back</Button>
                <Button ft_color={"white"} bg_color ={"#1877F2"}>Yes, delete it</Button>
            </ButtonContainers>

        </StyledMod>
    )
}
