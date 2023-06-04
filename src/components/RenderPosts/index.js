import { useState, useEffect, useRef, useContext } from "react";
import { DescriptionContainer, PostContainer, PostContentContainer, UrlContainer, UserName } from "../../pages/TimelinePage/styles.js";
import LinkPreview from "../LinkPreview/index.jsx";
import { FilledHeart, HeartOutline, LikeContainer, ProfilePicture, ProfilePictureContainer, StyledTrash, StyledPencil, EditInput } from "./styles.js";
import DialogBox from "../Dialog/index.js";
import { UserContext } from "../../App.js";
import Posts from "../../service/posts.js";
import BoldHashtag from "../BoldHashtags/index.jsx";
import axios from "axios";


export function RenderPosts({ 
    picture_url, 
    username, 
    description, 
    url, 
    id, 
    setReload, 
    user_id, 
    user_liked, 
    total_likes, 
    liked_users, 
    reloadPage, 
    tokenJson, 
    token 
}) {
    const [showModal, setShowModal] = useState(false);
    const [descriptionState, setDescriptionState] = useState(description);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);
    const [isLiked, setIsLiked] = useState(user_liked)
    const [isDisabled, setIsDisabled] = useState(false);
    const axiosUrl = `${process.env.REACT_APP_API_URL}/like`
    const { userInfo } = useContext(UserContext);
    console.log(userInfo)
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
            setLoading(true)
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
            } finally{
                setLoading(false)
            }
        }
    };

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
                    setReload(previous => !previous)
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
                    setReload(previous => !previous)
                })
                .catch((a) => {
                    console.log("erro", a.response?.data)
                    setIsDisabled(false)
                });
        }
    }

    return (
        <>
            <PostContainer data-test="post">
                <ProfilePictureContainer>
                    <ProfilePicture
                        pictureUrl={picture_url}
                        onError={(e) => {
                            e.target.src = 'https://cdn.onlinewebfonts.com/svg/img_258083.png';
                        }}></ProfilePicture>
                    <LikeContainer>
                        <button disabled={isDisabled} onClick={likePost}>{isLiked ? <FilledHeart></FilledHeart>
                            : <HeartOutline></HeartOutline>}</button>
                        <p>{total_likes} {total_likes === 1 ? 'like' : 'likes'}</p>
                    </LikeContainer>
                </ProfilePictureContainer>
                <PostContentContainer>
                    <UserName>{username}</UserName>
                    {isEditing ? (
                        <EditInput
                            type="text"
                            ref={inputRef}
                            value={descriptionState}
                            disabled={loading}
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

