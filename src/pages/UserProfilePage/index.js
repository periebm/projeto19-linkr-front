import axios from 'axios';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import Header from '../../components/Header/Header';
import { FeedContainer, TimelinePageContainer, TimelineTitle, GridContainer, NoPostsYet, TrendingsContainer, TopContainer, FollowButton } from './styles.js';
import PublishPost from '../../components/PublishPost/index.js';
import { RenderPosts } from '../../components/RenderPosts/index.js';
import { useNavigate, useParams } from 'react-router-dom';
import TrendingCard from '../../components/TrendingCard';

export default function UserProfilePage() {
    const {id} = useParams();
    const initialUrl = process.env.REACT_APP_API_URL;
    const [reloadPage, setReload] = useState(false);
    const [posts, setPosts] = useState([]);
    const [token, setToken] = useState({});
    const [username, setUsername] = useState("...")
    const codedToken = JSON.parse(localStorage.getItem('userInfo'));
    const url = `${initialUrl}/posts/user/${id}`;
    const urlFollow = `${initialUrl}/follow`
    const navigate = useNavigate();
    const [isDisabled, setIsDisabled] = useState(false);
    const [isFollowing, setFollowing] = useState(false);
    const [showButton, setShowButton] = useState(true);

    useEffect(() => {
        if (!codedToken) {
            navigate("/");
        }
        fetchPosts();
        decodeToken();
        if(codedToken.id == id){
            setShowButton(false);
        }
        else {
            setShowButton(true);
        }
    }, [reloadPage, id]);


    function fetchPosts() {
        const config = {
            headers: { authorization: `Bearer ${codedToken.token}` }
        };
        
        axios.get(url, config)
            .then((response) => {
                setPosts(response.data);
                setFollowing(response.data[0].is_following)
                setUsername(response.data[0].username)
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

    function handleFollow(){
        const config = {
            headers: { authorization: `Bearer ${codedToken.token}` }
          };
          const promise = axios.post(urlFollow,{following_id: id}, config);
          setIsDisabled(true);
          promise
            .then((a) => {
              setIsDisabled(false);
              setFollowing(!isFollowing);
            })
            .catch((a) => {
              alert("There was an error");
              setIsDisabled(false);
            });

    }


    return (
        <TimelinePageContainer>
            <Header />
            <FeedContainer>
                <TopContainer>
                    <TimelineTitle>{`${username}'s posts`}</TimelineTitle>
                    <FollowButton
                        disabled={isDisabled}
                        following={isFollowing}
                        onClick={()=>handleFollow()}
                        showButton = {showButton}
                        data-test="follow-btn"
                        >
                            {!isFollowing ? "Follow" : "Unfollow"}
                        </FollowButton>
                </TopContainer>
                

                <GridContainer>
                    <div>
                        {posts.length === 0 || posts[0].author === null ? (
                            <NoPostsYet><p>There are no posts yet.</p></NoPostsYet>
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




