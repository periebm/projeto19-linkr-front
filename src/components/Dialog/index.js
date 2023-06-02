import ReactModal from "react-modal";
import { Button, ButtonContainers, StyledMod, StyledProgressBarContainer } from "./styled";
import axios from "axios";
import { useState } from "react";
import { ProgressBar } from "react-loader-spinner";

export default function DialogBox({ showModal, setShowModal, id, setReload }) {
    const [isLoading, setIsLoading] = useState(false);
    const URL = "http://localhost:5000"
    function DeletePost() {
        setIsLoading(true)
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } 
        }

        axios.delete(`${URL}/delete/${id}`, config)
            .then((response) => {
                console.log(response.data);
                setShowModal(false);
                setIsLoading(false)
                setReload(true)
            })
            .catch((err) => {
                alert('Não foi possível excluir o post.')
                setShowModal(false);
                setIsLoading(false)
            });

    }


    return (
        <StyledMod
            isOpen={showModal}
            onRequestClose={() => setShowModal(false)}
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
            preventScroll={true}
            ariaHideApp={false}
            style={{ overlay: { zIndex: 99 } }}
        >
            {
                isLoading ? (
                    <>  
                        <StyledProgressBarContainer>
                            <ProgressBar borderColor="#ffffff" />
                        </StyledProgressBarContainer>
                    </>

                ) : (
                    <>
                        <h1> Are you sure you want to delete this post? </h1>

                        <ButtonContainers>
                            <Button
                                ft_color={"#1877F2"}
                                bg_color={"white"}
                                onClick={() => setShowModal(false)}>
                                No, go back
                            </Button>

                            <Button
                                ft_color={"white"}
                                bg_color={"#1877F2"}
                                onClick={() => DeletePost()}>
                                Yes, delete it
                            </Button>
                        </ButtonContainers>
                    </>
                )
            }
        </StyledMod>
    )
}
