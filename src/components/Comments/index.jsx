import React, { useEffect, useReducer, useContext, useRef, useState } from 'react';
import { UserContext } from '../../App';
import TYPES from "../../constants/types";
import commentsApi from '../../service/comments';
import { Container, CommentList } from './styles';
import send from "../../assets/icons/send.svg";

const reducer = (state, action) => {
    switch (action.type) {
        case TYPES.FETCH_REQUEST:
            return { ...state, loading: true };
        case TYPES.FETCH_SUCESSS:
            return { ...state, error: "", comments: action.payload, loading: false };
        case TYPES.FETCH_ERROR:
            return { ...state, error: action.payload, loading: false };
        default:
            return { ...state, loading: false };
    }
};

const Comments = ({ postId, isOpen, setTotalComments }) => {
    const [{ loading, error, comments }, dispatch] =
        useReducer(reducer, {
            comments: null,
            loading: false,
            error: ''
        });
    const { userInfo: { pictureUrl } } = useContext(UserContext);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            console.log("Deu fetch")
            const fetchComments = async () => {
                dispatch({ type: TYPES.FETCH_REQUEST });
                try {
                    const response = await commentsApi.getCommentsById(postId);
                    dispatch({ type: TYPES.FETCH_SUCESSS, payload: response });
                } catch (error) {
                    dispatch({ type: TYPES.FETCH_ERROR, payload: error.message });
                }
            };
            fetchComments();
        }
    }, [isOpen]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            dispatch({ type: TYPES.FETCH_REQUEST });
            const response = await commentsApi.createComment({ postId, content: inputRef.current.value });
            dispatch({ type: TYPES.FETCH_SUCESSS, payload: [...comments, ...response] });
            setTotalComments(previous => Number(previous) + 1);
            inputRef.current.value = '';
        } catch (error) {
            dispatch({ type: TYPES.FETCH_ERROR, payload: error.message });
        }
    };

    const handleKeyDown = async (event) => {
        if (event.key === "Enter") {
            handleSubmit(event);
        }
    };

    return (
        <Container isOpen={isOpen}>
            <CommentList isOpen={isOpen} data-test="comment-box">
                {comments?.map(comment => (
                    <li key={comment.id} data-test="comment">
                        <img src={comment.author.picture} alt="" />
                        <div>
                            <span>
                                {comment.author.username}
                                <span className="highlight">
                                    {comment.is_following ? <>&#x2022; following</> :
                                        comment.is_owner ? <>&#x2022; post's author</> : <></>
                                    }
                                </span>
                            </span>
                            <span>
                                {comment.content}
                            </span>
                        </div>
                    </li>
                ))}
            </CommentList>
            <form onSubmit={handleSubmit} >
                <img src={pictureUrl} alt="" />
                <input type="text" placeholder='write a comment...' required ref={inputRef} onKeyDown={handleKeyDown} data-test="comment-input" />
                <button data-test="comment-submit">
                    <img src={send} alt="" className='send' />
                </button>
            </form>
        </Container>
    );
};

export default Comments;
