import { useEffect, useState } from "react";
import { DescriptionContainer, PostContainer, PostContentContainer, UrlContainer, UserName } from "../../pages/TimelinePage/styles.js";
import LinkPreview from "../LinkPreview/index.jsx";
import { ProfilePicture, ProfilePictureContainer } from "../PublishPost/index.js";
import { StyledTrash } from "./styles.js";
import DialogBox from "../Dialog/index.js";
import { UserContext } from "../../App.js";
import { useContext } from "react";


export function RenderPosts(props) {
    const { picture_url, username, description, url, id, setReload, user_id } = props;
    const [showModal, setShowModal] = useState(false)
    const { userInfo, setUserInfo } = useContext(UserContext)

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
                    <DescriptionContainer>{description}</DescriptionContainer>
                    <UrlContainer>
                        <LinkPreview url={url}></LinkPreview>
                    </UrlContainer>
                    { (userInfo.id) == (user_id) && <StyledTrash onClick={() => setShowModal(true)} />}
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