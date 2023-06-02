import axios from 'axios'
import { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode';
import Header from '../../components/Header/Header';
import { FeedContainer, TimelinePageContainer, TimelineTitle } from './styles.js';
import PublishPost from '../../components/PublishPost/index.js';
import { RenderPosts } from '../../components/RenderPosts/index.js';
import { useNavigate } from 'react-router-dom';

export default function TimelinePage() {
    const initialUrl = process.env.REACT_APP_API_URL
    const url = `${initialUrl}/posts`;
    const [posts, setPosts] = useState([])
    const [token, setToken] = useState({})
    const codedToken = localStorage.getItem('token')

    const [reloadPage, setReload] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        if (!codedToken) {
            navigate("/");
        }
        fetchPosts();
        decodeToken()
    }, [reloadPage]);


    function fetchPosts() {
        axios.get(url)
            .then((response) => {
                setPosts(response.data);
            })
            .catch((error) => console.log('Erro ao buscar os posts', error.response));
    }

    function decodeToken() {
        try {
            const decoded = jwtDecode(codedToken);
            setToken(decoded)
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
                <PublishPost setPosts={setPosts} posts={posts} token={token} setToken={setToken}></PublishPost>

                {posts.length === 0 ? (
                    <p>There are no posts yet.</p>
                ) : (
                    posts.map((post) => {
                        return (
                            <RenderPosts
                                key={post.id}
                                username={post.username}
                                picture_url={post.picture_url}
                                description={post.description}
                                url={post.url}
                                id={post.id}
                                user_id = {post.user_id}
                                setReload={setReload}
                            />
                        );
                    })
                )}
            </FeedContainer>

        </TimelinePageContainer>
    )
}




