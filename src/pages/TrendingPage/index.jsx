import React, { useEffect, useReducer} from 'react';
import Posts from '../../service/posts';
import { useParams } from "react-router-dom";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import LinkPreview from '../../components/LinkPreview';

import { Container, PostForm, PostsArea, TrendingCard, MainContent } from './styles';

const TYPES = Object.freeze({
    FETCH_REQUEST: 'FETCH_REQUEST',
    FETCH_TRENDINGS: 'FETCH_TRENDINGS',
    FETCH_POSTS: 'FETCH_POSTS',
    FETCH_ERROR: 'FETCH_ERROR'
});

const reducer = (state, action) => {
    switch (action.type) {
        case TYPES.FETCH_REQUEST:
            return { ...state, loading: true };
        case TYPES.FETCH_TRENDINGS:
            return { ...state, error: "", trendings: action.trendings, loading: false };
        case TYPES.FETCH_POSTS:
            return { ...state, error: "", posts: action.posts, loading: false };
        case TYPES.FETCH_ERROR:
            return { ...state, error: action.payload, loading: false };
        default:
            return { ...state, loading: false };
    }
};

const TrendingPage = () => {
    const [{ loading, error, posts }, dispatch] =
        useReducer(reducer, {
            posts: [],
            trendings: [],
            loading: false,
            error: ''
        });
    const { hashtag } = useParams();

    useEffect(() => {
        const fetchPosts = async () => {
            dispatch({ type: TYPES.FETCH_REQUEST });
            try {
                const response = await Posts.getPostsByHashtag(hashtag);
                dispatch({ type: TYPES.FETCH_POSTS, posts: response });
            } catch (error) {
                dispatch({ type: TYPES.FETCH_ERROR, payload: error.message });
            }
        };

        const fetchTrendings = async () => {
            dispatch({ type: TYPES.FETCH_REQUEST });
            try {
                const response = await Posts.getPostsByHashtag(hashtag);
                dispatch({ type: TYPES.FETCH_TRENDINGS, trendings: response });
            } catch (error) {
                dispatch({ type: TYPES.FETCH_ERROR, payload: error.message });
            }
        };

        fetchPosts();
    }, []);

    const onSubmit = (data) => {

    };

    return (
        <Container>
            <h1># {hashtag.toLowerCase()}</h1>
            <MainContent>
                <PostsArea>
                    {posts?.map((post) => (
                        <PostForm key={post.id}>
                            <div>
                                <img src="https://cdn.onlinewebfonts.com/svg/img_258083.png" alt="" />

                                <IoHeartOutline />
                                <p>{post.total_likes} likes</p>

                            </div>
                            <div>
                                <h4>{post.author_username}</h4>
                                <p>{post.description}</p>
                                <LinkPreview url={"https://filmize.tv/series/dr-house"} />
                            </div>
                        </PostForm>
                    ))}
                </PostsArea>
                <TrendingCard>
                    <div>
                        <h2>trending</h2>
                    </div>
                    <div>

                    </div>
                </TrendingCard>
            </MainContent>
        </Container>
    );
};

export default TrendingPage;
