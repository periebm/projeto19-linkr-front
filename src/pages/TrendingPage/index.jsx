import React, { useContext, useEffect, useReducer, useState } from 'react';
import Posts from '../../service/posts';
import { useNavigate, useParams } from "react-router-dom";
import SkeletonTrending from './Skeleton';
import TrendingCard from '../../components/TrendingCard';
import { RenderPosts } from '../../components/RenderPosts';
import Header from '../../components/Header/Header';
import { UserContext } from '../../App';
import InfiniteScroll from 'react-infinite-scroller';
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
    const [reload, setReload] = useState(false);
    const { hashtag } = useParams();
    const { userInfo } = useContext(UserContext);
    const [hasMore, setHasMore] = useState(true);
    const [offset, setOffset] = useState(0);
    const navigate = useNavigate();

    const fetchPosts = async () => {
        dispatch({ type: TYPES.FETCH_TRENDING_CHANGE });
        try {
            const response = await Posts.getPostsByHashtag(hashtag, offset);
            dispatch({ type: TYPES.FETCH_POSTS, posts: response });
        } catch (error) {
            dispatch({ type: TYPES.FETCH_ERROR, payload: error.message });
        }
    };

    useEffect(() => {
        if (!userInfo) {
            navigate("/");
        }
        setOffset(previous => Number(previous) * 0);
        setHasMore(true);
        fetchPosts();
    }, [reload, hashtag]);

    async function loadMorePosts() {
        try {
            const response = await Posts.getPostsByHashtag(hashtag, offset);
            dispatch({ type: TYPES.FETCH_POSTS, posts: [...posts, ...response] });

            if (response.length < 10) {
                setOffset(previous => Number(previous) * 0);
                setHasMore(false);
            }

            setOffset(previous => Number(previous) + 10);
        } catch (error) {
            dispatch({ type: TYPES.FETCH_ERROR, payload: error.message });
        }
    }
    return (
        <Container>
            <Header />
            <h1 data-test="hashtag-title"># {hashtag.toLowerCase()}</h1>
            <MainContent>
                <PostsArea>
                    {loading ?
                        <SkeletonTrending /> :
                        (<InfiniteScroll
                            pageStart={0}
                            loadMore={loadMorePosts}
                            hasMore={hasMore}
                            loader={<div key={0}>Loading...</div>}>

                            {posts?.map((post, index) => (
                                <RenderPosts
                                    username={post.author.username}
                                    description={post.description}
                                    picture_url={post.author.picture}
                                    key={post.id}
                                    url={post.url}
                                    user_id={userInfo.id}
                                    user_liked={post.user_liked}
                                    total_likes={post.total_likes}
                                    liked_users={post.liked_users}
                                    token={userInfo}
                                    tokenJson={{ id: post.user_id }}
                                    id={post.id}
                                    total_comments={post.total_comments}
                                    setReload={setReload}
                                    total_reposts={post.total_reposts}
                                />
                            ))}
                        </InfiniteScroll>
                        )}
                </PostsArea>
                <TrendingCard reload={reload} />
            </MainContent>
        </Container>
    );
};

export default TrendingPage;
