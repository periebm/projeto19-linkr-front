import { useState, useEffect, useRef } from "react";
import { DescriptionContainer, PostContainer, PostContentContainer, UrlContainer, UserName } from "../../pages/TimelinePage/styles.js";
import LinkPreview from "../LinkPreview/index.jsx";
import { FilledHeart, HeartOutline, LikeContainer, ProfilePicture, ProfilePictureContainer, StyledTrash, StyledPencil, EditInput } from "./styles.js";
import DialogBox from "../Dialog/index.js";
import Posts from "../../service/posts.js";
import BoldHashtag from "../BoldHashtags/index.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import styled from "styled-components";
import RepostHeader from "../RepostHeader/RepostHeader.jsx";
import repostImg from "../../assets/icons/repost.svg";
import commentIcon from "../../assets/icons/comment.svg";
import DialogRepost from "../DialogRepost/index.js";
import Comments from "../Comments/index.jsx";

export function RenderPosts({
    total_comments,
    total_reposts,
    reposted_by,
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
    const [showRepostConfirm, setShowRepostConfirm] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [descriptionState, setDescriptionState] = useState(description);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);
    const [isLiked, setIsLiked] = useState(user_liked);
    const [isDisabled, setIsDisabled] = useState(false);
    const [likedText, setLikedText] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [totalComments, setTotalComments] = useState(total_comments);
    const axiosUrl = `${process.env.REACT_APP_API_URL}/like`;
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const navigate = useNavigate();

    useEffect(() => {
        if (isEditing) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    useEffect(() => {
        setLikedTextFunc(liked_users);
    }, [liked_users]);


    const handleEditClick = () => {
        if (isEditing) {
            setDescriptionState(description);
        }
        setIsEditing(!isEditing);
    };

    function setLikedTextFunc(array) {
        const totalLikesNumber = parseInt(total_likes);
        if (array.includes(token.username)) {
            if (totalLikesNumber >= 4) {
                setLikedText(`Você, ${array[0]} e outras ${totalLikesNumber - 2} pessoas`);
            } else {
                switch (totalLikesNumber) {
                    case 3:
                        setLikedText(`Você, ${array[0]} e mais 1 pessoa`);
                        break;
                    case 2:
                        setLikedText(`Você e ${array[0]}`);
                        break;
                    case 1:
                        setLikedText(`Você`);
                        break;
                    case 0:
                        setLikedText(`Ninguem`);
                        break;
                    default:
                        setLikedText(`aff`);
                        break;
                }
            }
        } else {
            if (totalLikesNumber >= 4) {
                setLikedText(`${array[0]}, ${array[1]} e outras ${totalLikesNumber - 2} pessoas`);
            } else {
                switch (totalLikesNumber) {
                    case 3:
                        setLikedText(`${array[0]}, ${array[1]} e mais 1 pessoa`);
                        break;
                    case 2:
                        setLikedText(`${array[0]} e ${array[1]}`);
                        break;
                    case 1:
                        setLikedText(`${array[0]}`);
                        break;
                    case 0:
                        setLikedText(`Ninguem`);
                        break;
                    default:
                        setLikedText(`aff`);
                        break;
                }
            }
        }
    }

    const handleSubmitOnKeyDown = async (e) => {
        if (e.key === 'Escape') {
            setIsEditing(false);
            setDescriptionState(description);
        }

        if (e.key === 'Enter') {
            setLoading(true);
            try {
                const body = {
                    description: descriptionState
                };
                await Posts.updatePost(body, id);
                setReload(previous => !previous);
                setIsEditing(false);
            } catch (error) {
                alert("Não foi possível fazer a edição!");
                setIsEditing(true);
            } finally {
                setLoading(false);
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
        };
        setIsDisabled(true);
        if (isLiked) {
            const promise = axios.delete(axiosUrl, {
                headers: { authorization: `Bearer ${token.token}` },
                data: body
            });
            promise
                .then(() => {
                    setLikedTextFunc(liked_users);
                    setIsDisabled(false);
                    setIsLiked(false);
                    setReload(previous => !previous);
                })
                .catch((a) => {
                    console.log("erro", a);
                    setIsDisabled(false);
                });

        }
        else {
            const promise = axios.post(axiosUrl, body, config);
            promise
                .then(() => {
                    setLikedTextFunc(liked_users);
                    setIsDisabled(false);
                    setIsLiked(true);
                    setReload(previous => !previous);
                })
                .catch((a) => {
                    console.log("erro", a.response?.data);
                    setIsDisabled(false);
                });
        }
    }

    function repostPost() {
        setShowRepostConfirm(true);
    }

    return (
        <PostOutSideContainer>
            {reposted_by && <RepostHeader reposted_by={reposted_by} />}
            {showRepostConfirm && <DialogRepost setReload={setReload} id={id} showModal={showRepostConfirm} setShowModal={setShowRepostConfirm}></DialogRepost>}
            <PostContainer isReposted={!!reposted_by} data-test="post">
                <ProfilePictureContainer>
                    <ProfilePicture
                        pictureUrl={picture_url}
                        onError={(e) => {
                            e.target.src = 'https://cdn.onlinewebfonts.com/svg/img_258083.png';
                        }}></ProfilePicture>
                    <LikeContainer>
                        <button disabled={isDisabled} data-test="like-btn" onClick={likePost}>
                            {isLiked ? <FilledHeart /> : <HeartOutline />}
                        </button>

                        <ReactTooltip
                            data-test="tooltip"
                            id="like-number"
                            style={{
                                backgroundColor: "rgba(255, 255, 255, 0.9)",
                                color: "#505050"
                            }} />

                        <p data-test="counter"
                            data-tooltip-id="like-number"
                            data-tooltip-place="bottom"
                            data-tooltip-content={likedText}>
                            {total_likes} {total_likes === 1 ? 'like' : 'likes'}
                        </p>

                        <button style={{ cursor: "pointer" }} disabled={isDisabled} onClick={() => setIsOpen(!isOpen)}>
                            <img src={commentIcon} alt=""></img>
                        </button>

                        <p data-test="counter">
                            {totalComments} {total_comments === 1 ? 'comment' : 'comments'}
                        </p>

                        <button style={{ cursor: "pointer" }} disabled={isDisabled} onClick={() => { }}>
                            <img src={repostImg} alt="" />
                        </button>

                        <ReactTooltip data-test="tooltip" id="like-number" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", color: "#505050" }} />
                        <p data-test="counter"
                            data-tooltip-id="like-number"
                            data-tooltip-place="bottom"
                        >
                            {total_reposts} {total_reposts === 1 ? 're_post' : 're_posts'}
                        </p>
                    </LikeContainer>
                </ProfilePictureContainer>
                <PostContentContainer>
                    <UserName data-test="username" onClick={() => navigate(`/user/${user_id}`)}>{username}</UserName>
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
                    {(userInfo.id) === (user_id) && <StyledTrash data-test="delete-btn" onClick={() => setShowModal(true)} />}
                </PostContentContainer>
            </PostContainer>
            <DialogBox
                showModal={showModal}
                setShowModal={setShowModal}
                id={id}
                setReload={setReload}
                user_id={user_id} />
            <Comments postId={id} isOpen={isOpen} setTotalComments={setTotalComments} />
        </PostOutSideContainer>
    );
}

const PostOutSideContainer = styled.div`
position: relative;
`;