import { useState, useEffect, useRef, useContext } from "react";
import { DescriptionContainer, PostContainer, PostContentContainer, UrlContainer, UserName } from "../../pages/TimelinePage/styles.js";
import LinkPreview from "../LinkPreview/index.jsx";
import { ProfilePicture, ProfilePictureContainer } from "../PublishPost/index.js";
import { StyledTrash, StyledPencil, EditInput } from "./styles.js";
import DialogBox from "../Dialog/index.js";
import { UserContext } from "../../App.js";
import Posts from "../../service/posts.js";
import BoldHashtag from "../BoldHashtags/index.jsx";

export function RenderPosts({ picture_url, username, description, url, id, setReload, user_id }) {
    const [showModal, setShowModal] = useState(false);
    const [descriptionState, setDescriptionState] = useState(description);
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef(null);
    const { userInfo } = useContext(UserContext);

    useEffect(() => {
        if (isEditing) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleEditClick = () => {
        if (isEditing) {
            setDescriptionState(description);
        }
        setIsEditing(!isEditing);
    };

    const handleSubmitOnKeyDown = async (e) => {
        if (e.key === 'Escape') {
            setIsEditing(false);
            setDescriptionState(description);
        }

        if (e.key === 'Enter') {
            try {
                const body = {
                    description: descriptionState
                };
                await Posts.updatePost(body, id);
                setReload(previous => !previous)
                setIsEditing(false);
            } catch (error) {
                alert("Não foi possível fazer a edição!");
                setIsEditing(true);
            }
        }
    };

    return (
        <>
            <PostContainer>
                <ProfilePictureContainer>
                    <ProfilePicture
                        pictureUrl={picture_url}
                        onError={(e) => {
                            e.target.src = 'https://cdn.onlinewebfonts.com/svg/img_258083.png';
                        }}></ProfilePicture>
                </ProfilePictureContainer>
                <PostContentContainer>
                    <UserName>{username}</UserName>
                    {isEditing ? (
                        <EditInput
                            type="text"
                            ref={inputRef}
                            value={descriptionState}
                            onKeyDown={handleSubmitOnKeyDown}
                            onChange={(e) => setDescriptionState(e.target.value)}
                        />
                    ) : (
                        <DescriptionContainer>
                            <BoldHashtag text={descriptionState} />
                        </DescriptionContainer>
                    )}
                    <UrlContainer>
                        <LinkPreview url={url}></LinkPreview>
                    </UrlContainer>
                    {(userInfo.id) === (user_id) && <StyledPencil onClick={handleEditClick} />}
                    {(userInfo.id) === (user_id) && <StyledTrash onClick={() => setShowModal(true)} />}
                </PostContentContainer>
            </PostContainer>
            <DialogBox
                showModal={showModal}
                setShowModal={setShowModal}
                id={id}
                setReload={setReload}
                user_id={user_id} />
        </>
    );
}