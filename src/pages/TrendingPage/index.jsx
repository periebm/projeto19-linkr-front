import React, { useEffect, useReducer } from 'react';
import Posts from '../../service/posts';
import Trendings from '../../service/trendings';
import { useParams, Link } from "react-router-dom";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import LinkPreview from '../../components/LinkPreview';
import SkeletonTrending from './Skeleton';
import BoldHashtag from '../../components/BoldHashtags';

import { Container, PostForm, PostsArea, TrendingCard, TrendingCardTitle, MainContent } from './styles';

const TYPES = Object.freeze({
    FETCH_REQUEST: 'FETCH_REQUEST',
    FETCH_TRENDINGS: 'FETCH_TRENDINGS',
    FETCH_POSTS: 'FETCH_POSTS',
    FETCH_TRENDING_CHANGE: 'FETCH_TRENDING_CHANGE',
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
        case TYPES.FETCH_TRENDING_CHANGE:
            return { ...state, posts: [], loading: true };
        case TYPES.FETCH_ERROR:
            return { ...state, error: action.payload, loading: false };
        default:
            return { ...state, loading: false };
    }
};

const TrendingPage = () => {
    const [{ loading, error, posts, trendings }, dispatch] =
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
                console.log(response);
                dispatch({ type: TYPES.FETCH_POSTS, posts: response });
            } catch (error) {
                dispatch({ type: TYPES.FETCH_ERROR, payload: error.message });
            }
        };

        const fetchTrendings = async () => {
            dispatch({ type: TYPES.FETCH_REQUEST });
            try {
                const response = await Trendings.getTrendings();
                dispatch({ type: TYPES.FETCH_TRENDINGS, trendings: response });
            } catch (error) {
                dispatch({ type: TYPES.FETCH_ERROR, payload: error.message });
            }
        };

        fetchPosts();
        fetchTrendings();
    }, [hashtag]);

    const handleTrendingChange = (trending) => {
        if (trending !== hashtag) {
            dispatch({ type: TYPES.FETCH_TRENDING_CHANGE });
        }
    };

    return (
        <Container>
            <h1># {hashtag.toLowerCase()}</h1>
            <MainContent>
                <PostsArea>
                    {loading ?
                        <SkeletonTrending /> :
                        (
                            posts?.map((post, index) => (
                                <PostForm key={index}>
                                    <div>
                                        <img
                                            src={post.author.picture}
                                            alt=""
                                            onError={(e) => {
                                                e.target.src = 'https://cdn.onlinewebfonts.com/svg/img_258083.png';
                                            }} />

                                        {post.user_liked ? <IoHeart /> : <IoHeartOutline />}
                                        <p>{post.total_likes} likes</p>

                                    </div>
                                    <div>
                                        <h4>{post.author.username}</h4>
                                        <BoldHashtag text={post.description} />
                                        <LinkPreview url={post.url} />
                                    </div>
                                </PostForm>
                            ))
                        )}
                </PostsArea>
                <TrendingCard>
                    <TrendingCardTitle>
                        <h2>trending</h2>
                    </TrendingCardTitle>
                    <div>
                        {trendings?.map((trending) => (
                            <div key={trending.name}>
                                <p>
                                    <Link
                                        to={`/timeline/hashtag/${trending.name}`}
                                        onClick={() => handleTrendingChange(trending.name)}
                                    >
                                        # {trending.name}
                                    </Link>
                                </p>
                            </div>
                        ))}
                    </div>
                </TrendingCard>
            </MainContent>
        </Container>
    );
};

export default TrendingPage;
