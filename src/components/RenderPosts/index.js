import { useState } from "react";
import { DescriptionContainer, PostContainer, PostContentContainer, UrlContainer, UserName } from "../../pages/TimelinePage/styles.js";
import LinkPreview from "../LinkPreview/index.jsx";
import { FilledHeart, HeartOutline, LikeContainer, ProfilePicture, ProfilePictureContainer, StyledTrash, StyledPencil, EditInput } from "./styles.js";
import DialogBox from "../Dialog/index.js";
import { UserContext } from "../../App.js";
import { useContext } from "react";
import Posts from "../../service/posts.js";
import BoldHashtag from "../BoldHashtags/index.jsx";
import axios from "axios";


export function RenderPosts(props) {
    const { picture_url, username, description, url, id, setReload, user_id, user_liked, total_likes, liked_users, reloadPage, tokenJson, token } = props;
    const [showModal, setShowModal] = useState(false);
    const [descriptionState, setDescriptionState] = useState(description);
    const [isEditing, setIsEditing] = useState(false);
    const { userInfo } = useContext(UserContext);

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
    const [isLiked, setIsLiked] = useState(user_liked)
    const [isDisabled, setIsDisabled] = useState(false);
    const axiosUrl = `${process.env.REACT_APP_API_URL}/like`

    function likePost() {
        const config = {
            headers: { authorization: `Bearer ${token.token}` }
        };
        const body = {
            user_id: tokenJson.id,
            post_id: id
        }
        setIsDisabled(true)
        if (isLiked) {
            const promise = axios.delete(axiosUrl, {
                headers: { authorization: `Bearer ${token.token}` },
                data: body
            });
            promise
                .then(() => {
                    setIsDisabled(false)
                    setIsLiked(false)
                    setReload(!reloadPage)
                })
                .catch((a) => {
                    console.log("erro", a)
                    setIsDisabled(false)
                });

        }
        else {
            const promise = axios.post(axiosUrl, body, config)
            promise
                .then(() => {
                    setIsDisabled(false)
                    setIsLiked(true)
                    setReload(!reloadPage)
                })
                .catch((a) => {
                    console.log("erro", a.response.data)
                    setIsDisabled(false)
                });
        }
    }

    return (
        <>
            <PostContainer>
                <ProfilePictureContainer>
                    <ProfilePicture
                        pictureUrl={picture_url}
                        onError={(e) => {
                            e.target.src = 'https://cdn.onlinewebfonts.com/svg/img_258083.png';
                        }}></ProfilePicture>
                    <LikeContainer>
                        <button disabled={isDisabled} onClick={likePost}>{isLiked ? <FilledHeart></FilledHeart>
                            : <HeartOutline></HeartOutline>}</button>
                        <p>{total_likes} {total_likes == 1 ? 'like' : 'likes'}</p>
                    </LikeContainer>
                </ProfilePictureContainer>
                <PostContentContainer>
                    <UserName>{username}</UserName>
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

