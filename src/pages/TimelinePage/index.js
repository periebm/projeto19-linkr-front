import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Header from '../../components/Header/Header';
import { FeedContainer, TimelinePageContainer, TimelineTitle, GridContainer, TrendingsContainer, NewPostContainer, NoPostMessage } from './styles.js';
import PublishPost from '../../components/PublishPost/index.js';
import { RenderPosts } from '../../components/RenderPosts/index.js';
import TrendingCard from '../../components/TrendingCard';
import { useInterval } from '@react-hooks-library/core'

export default function TimelinePage() {
    const initialUrl = process.env.REACT_APP_API_URL;
    const [reloadPage, setReload] = useState(false);
    const [posts, setPosts] = useState([]);
    const [token, setToken] = useState({});
    const [areThereNewPosts, setAreThereNewPosts] = useState(false);
    const [storedPost, setStoredPost] = useState([]);
    const [totalPosts, setTotalPosts] = useState(0)
    const [postDifference, setPostDifference] = useState(0);
    const [offset, setOffset] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const [limit, setLimit] = useState(10)
    const [isFollowingAnyone, setFollowing] = useState(false);
    const codedToken = JSON.parse(localStorage.getItem('userInfo'));
    const url = `${initialUrl}/posts`;
    const navigate = useNavigate();

    useEffect(() => {
        if (!codedToken) {
            navigate("/");
            return;
        }
        fetchPosts(null);
        getFollowers();
        decodeToken();
    }, [reloadPage]);

    useInterval(fetchPostsInterval, 15000);

    function fetchPosts(newPost) {
        const config = {
            headers: { authorization: `Bearer ${codedToken.token}` }
        };
        axios.get(url, config)
        .then((response) => {
            const postsData = response.data.slice(0, limit);
            setTotalPosts(response.data.length)
            if (newPost) {
                setPosts(newPost);
            } else {
                setPosts(postsData);
            }
        })
        .catch((error) => console.log('Erro ao buscar os posts', error.response));
    }

    function fetchPostsInterval() {
        const config = {
            headers: { authorization: `Bearer ${codedToken.token}` }
        };
        axios.get(url, config)
            .then((response) => {
                setTotalPosts(response.data.length)
                if (response.data.length > totalPosts) {
                    setAreThereNewPosts(true);
                    setPostDifference(response.data.length - totalPosts);
                }
                setStoredPost(response.data.slice(0, limit + response.data.length - totalPosts));
            })
            .catch((error) => console.log('Erro ao buscar os posts', error.response));
    }

    function getFollowers(){
        const config = {
            headers: { authorization: `Bearer ${codedToken.token}` }
        };
        axios.get(`${initialUrl}/follow`, config)
            .then((response) => {
                setFollowing(response.data[0].is_following_anyone);
            })
            .catch((error) => console.log('Erro ao buscar os followers', error.response));
    }

    function decodeToken() {
        try {
            const decoded = jwtDecode(codedToken.token);
            setToken(decoded);
            return decoded;
        } catch (error) {
            console.error('Erro ao decodificar o token:', error);
            return null;
        }
    }

    async function loadMorePosts() {

        const config = {
            headers: { authorization: `Bearer ${codedToken.token}` }
        };

        axios.get(`${url}?offset=${offset + 10}`, config)
            .then((response) => {
                setOffset(offset + 10);
                setLimit(limit + 10)
                const newPosts = response.data;
                if (newPosts.length < 10) {
                    setHasMore(false)
                }

                setPosts((prevPosts) => [...prevPosts, ...newPosts]);
            })
            .catch((error) => console.log('Erro ao buscar os posts', error.response));
    }


    function loadNewPosts() {
        setAreThereNewPosts(false);
        setPostDifference(0);
        fetchPosts(storedPost);
    }

    return (
        <TimelinePageContainer>
            <Header />
            <FeedContainer>
                <TimelineTitle>timeline</TimelineTitle>
                <GridContainer>
                    <div>
                        <PublishPost
                            setPosts={setPosts}
                            posts={posts}
                            token={token}
                            setToken={setToken}
                            setReload={setReload}
                        >
                        </PublishPost>
                        {areThereNewPosts ? <NewPostContainer data-test="load-btn" onClick={loadNewPosts}>
                            <p>{postDifference} new posts, load more!</p>
                            <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.2391 4.19004e-06C15.4598 4.19004e-06 18.9272 3.10714 19.513 7.14285H22L17.8152 11.9048L13.6304 7.14285H16.4043C16.1369 5.9775 15.4804 4.93688 14.5423 4.19091C13.6042 3.44495 12.4397 3.03771 11.2391 3.03571C9.50543 3.03571 7.975 3.88095 7.00652 5.15476L4.96196 2.83333C5.74453 1.94233 6.70962 1.22848 7.79235 0.739766C8.87507 0.251055 10.0503 -0.00118567 11.2391 4.19004e-06ZM10.7609 16C6.55217 16 3.07283 12.8928 2.48696 8.85714H0L4.18478 4.09524C5.5837 5.67857 6.97065 7.27381 8.36957 8.85714H5.59565C5.86314 10.0225 6.51955 11.0631 7.45769 11.8091C8.39583 12.555 9.56028 12.9623 10.7609 12.9643C12.4946 12.9643 14.025 12.119 14.9935 10.8452L17.038 13.1667C16.2562 14.0586 15.2913 14.773 14.2084 15.2618C13.1255 15.7506 11.9498 16.0023 10.7609 16Z" fill="white" />
                            </svg>
                        </NewPostContainer>
                            :
                            <></>}
                        {
                            isFollowingAnyone === true ?
                            ( 
                                posts.length === 0 ? (
                                    <NoPostMessage data-test="message">No posts found from your friends.</NoPostMessage>
                                ) : (
                                    <InfiniteScroll
                                pageStart={0}
                                loadMore={loadMorePosts}
                                hasMore={hasMore}
                                loader={<div key={0}>Loading...</div>}
                            >
                                    {posts.map((post) => (
                                        
                                            <RenderPosts
                                                tokenJson={token}
                                                token={codedToken}
                                                key={post.id}
                                                username={post.author.username}
                                                picture_url={post.author.picture}
                                                description={post.description}
                                                url={post.url}
                                                user_liked={post.user_liked}
                                                total_likes={post.total_likes}
                                                liked_users={post.liked_users}
                                                id={post.id}
                                                user_id={post.user_id}
                                                setReload={setReload}
                                                reloadPage={reloadPage}
                                                reposted_by={post.reposted_by}
                                                total_comments={post.total_comments}
                                                total_reposts={post.total_reposts}
                                            />
                                        )
                                    )}</InfiniteScroll>
                                )
                            ) : <NoPostMessage data-test="message">You don't follow anyone yet. Search for new friends!.</NoPostMessage>
                        }
                    </div>
                    <TrendingsContainer>
                        <TrendingCard reload={reloadPage} />
                    </TrendingsContainer>
                </GridContainer>
            </FeedContainer>
        </TimelinePageContainer>
    );
}




