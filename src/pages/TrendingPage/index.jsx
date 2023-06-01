import React, { useEffect, useReducer } from 'react';
import Posts from '../../service/posts';
import Trendings from '../../service/trendings';
import { useParams } from "react-router-dom";
import SkeletonTrending from './Skeleton';
import TrendingCard from '../../components/TrendingCard';
import { RenderPosts } from '../../components/RenderPosts';
import Header from '../../components/Header/Header';

import { Container, PostsArea, MainContent } from './styles';

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
    const [{ loading, error, posts }, dispatch] =
        useReducer(reducer, {
            posts: [],
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
                const response = await Trendings.getTrendings();
                dispatch({ type: TYPES.FETCH_TRENDINGS, trendings: response });
            } catch (error) {
                dispatch({ type: TYPES.FETCH_ERROR, payload: error.message });
            }
        };

        fetchPosts();
        fetchTrendings();
    }, [hashtag]);

    return (
        <Container>
            <Header />
            <h1># {hashtag.toLowerCase()}</h1>
            <MainContent>
                <PostsArea>
                    {loading ?
                        <SkeletonTrending /> :
                        (
                            posts?.map((post, index) => (
                                <RenderPosts
                                    username={post.author.username}
                                    description={post.description}
                                    picture_url={post.author.picture}
                                    url={post.url}
                                />
                            ))
                        )}
                </PostsArea>
                <TrendingCard />
            </MainContent>
        </Container>
    );
};

export default TrendingPage;
