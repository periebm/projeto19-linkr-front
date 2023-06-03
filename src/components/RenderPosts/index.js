import { useState } from "react";
import { DescriptionContainer, PostContainer, PostContentContainer, UrlContainer, UserName } from "../../pages/TimelinePage/styles.js";
import LinkPreview from "../LinkPreview/index.jsx";
import { ProfilePicture, ProfilePictureContainer } from "../PublishPost/index.js";
import { StyledTrash, StyledPencil, EditInput } from "./styles.js";
import DialogBox from "../Dialog/index.js";
import { UserContext } from "../../App.js";
import { useContext } from "react";
import Posts from "../../service/posts.js";
import BoldHashtag from "../BoldHashtags/index.jsx";
import { Navigate, useNavigate } from "react-router-dom";

export function RenderPosts(props) {
    const { picture_url, username, description, url, id, setReload, user_id } = props;
    const [showModal, setShowModal] = useState(false);
    const [descriptionState, setDescriptionState] = useState(description);
    const [isEditing, setIsEditing] = useState(false);
    const { userInfo } = useContext(UserContext);
    const navigate = useNavigate();

    const handleEditClick = async () => {
        if (isEditing) {
            try {
                const body = {
                    description: descriptionState
                };
                await Posts.updatePost(body, id);
            } catch (error) {
                console.log(error);
            }
        }
        setIsEditing(!isEditing);
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
                    <UserName onClick={()=> navigate(`/user/${user_id}`)}>{username}</UserName>
                    {isEditing ? (
                        <EditInput type="text" value={descriptionState} onChange={(e) => setDescriptionState(e.target.value)} />
                    ) : (
                        <DescriptionContainer>
                            <BoldHashtag text={descriptionState} />
                        </DescriptionContainer>
                    )}
                    <UrlContainer>
                        <LinkPreview url={url}></LinkPreview>
                    </UrlContainer>
                    {(userInfo.id) === (user_id) && <StyledPencil onClick={handleEditClick} />}
                    {(userInfo.id) === (user_id) && <StyledTrash  data-test="delete-btn" onClick={() => setShowModal(true) } />}
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