import ReactModal from "react-modal";
import { Button, ButtonContainers, StyledMod, StyledProgressBarContainer } from "./styled";
import axios from "axios";
import { useState } from "react";
import { ProgressBar } from "react-loader-spinner";

export default function DialogRepost({ showModal, setShowModal, id, setReload }) {
    const [isLoading, setIsLoading] = useState(false);
    const URL = process.env.REACT_APP_API_URL
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))

    function repostPost() {
        setIsLoading(true)
        console.log(userInfo.token)
        const config = {
            headers: { Authorization: `Bearer ${userInfo.token}` } 
        }
        
        axios.post(`${URL}/repost/${id}`, {},config)
            .then((response) => {
                setShowModal(false);
                setIsLoading(false)
                setReload(previous => !previous)
            })
            .catch((err) => {
                alert('Não foi possível re-postar o post.')
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
                        <h1> Do you want to re-post this link? </h1>

                        <ButtonContainers>
                            <Button 
                                ft_color={"#1877F2"}
                                bg_color={"white"}
                                onClick={() => setShowModal(false)}
                                data-test="cancel">
                                No, cancel
                            </Button>

                            <Button
                                ft_color={"white"}
                                bg_color={"#1877F2"}
                                onClick={() => repostPost()}
                                data-test="confirm">
                                Yes, share!
                            </Button>
                        </ButtonContainers>
                    </>
                )
            }
        </StyledMod>
    )
}
