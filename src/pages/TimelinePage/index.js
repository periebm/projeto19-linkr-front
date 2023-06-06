import axios from 'axios';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import Header from '../../components/Header/Header';
import { FeedContainer, TimelinePageContainer, TimelineTitle, GridContainer, TrendingsContainer } from './styles.js';
import PublishPost from '../../components/PublishPost/index.js';
import { RenderPosts } from '../../components/RenderPosts/index.js';
import { useNavigate } from 'react-router-dom';
import TrendingCard from '../../components/TrendingCard';

export default function TimelinePage() {
    const initialUrl = process.env.REACT_APP_API_URL;
    const [reloadPage, setReload] = useState(false);
    const [posts, setPosts] = useState([]);
    const [token, setToken] = useState({});
    const codedToken = JSON.parse(localStorage.getItem('userInfo'));
    const url = `${initialUrl}/posts`;
    const navigate = useNavigate();

    useEffect(() => {
        if (!codedToken) {
            navigate("/");
            return;
        }
        fetchPosts();
        decodeToken();
    }, [reloadPage]);


    function fetchPosts() {
        const config = {
            headers: { authorization: `Bearer ${codedToken.token}` }
        };
        axios.get(url, config)
            .then((response) => {
                setPosts(response.data);
            })
            .catch((error) => console.log('Erro ao buscar os posts', error.response));
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

                        {posts.length === 0 ? (
                            <p data-test="message">There are no posts yet.</p>
                        ) : (
                            posts.map((post) => {
                                return (
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
                                        total_reposts={post.total_reposts}
                                    />
                                );
                            })
                        )}
                    </div>
                    <TrendingsContainer>
                        <TrendingCard reload={reloadPage} />
                    </TrendingsContainer>
                </GridContainer>

            </FeedContainer>

        </TimelinePageContainer >
    );
}




