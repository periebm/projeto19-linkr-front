import axios from 'axios'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Header from '../../components/Header/Header';

export default function TimelinePage() {
    const initialUrl = process.env.REACT_APP_API_URL
    const url = `http://localhost:5000/posts`;
    const [posts, setPosts] = useState([])
    const [form, setForm] = useState({})

    useEffect(() => {
        axios.get(url)
            .then((response) => {
                setPosts(response.data)
                console.log(response.data)
            })
            .catch((error) => console.log('erro', error.response));
    }, [])

    function handleChange(event) {
        setForm({ ...form, [event.target.name]: event.target.value })
        console.log(form)
    }

    return (
        <TimelinePageContainer>
            <Header />
            <FeedContainer>
                <TimelineTitle>timeline</TimelineTitle>
                <PublishContainer>
                    <ProfilePictureContainer>
                        <ProfilePicture></ProfilePicture>
                    </ProfilePictureContainer>
                    <PostContentContainer>
                        <ShareToday>What are you going to share today?</ShareToday>
                        <UrlInput placeholder='http://...'></UrlInput>
                        <DescriptionInput placeholder='Awesome article about #javascript'></DescriptionInput>
                        <PublishButtonContainer>
                            <PublishButton>Publish</PublishButton>
                        </PublishButtonContainer>
                    </PostContentContainer>
                </PublishContainer>
                {posts.map((post) => {
                    return (
                        <RenderPosts
                            key={post.id}
                            username={post.username}
                            picture_url={post.picture_url}
                            description={post.description}
                            url={post.url}
                        />
                    );
                })}
            </FeedContainer>

        </TimelinePageContainer>
    )
}

function RenderPosts(props) {
    const { picture_url, username, description, url } = props
    return (
        <>
            <PostContainer>
                <ProfilePictureContainer>
                    <ProfilePicture pictureUrl={picture_url}></ProfilePicture>
                </ProfilePictureContainer>
                <PostContentContainer>
                    <UserName>{username}</UserName>
                    <DescriptionContainer>{description}</DescriptionContainer>
                    <UrlContainer>{url}</UrlContainer>
                </PostContentContainer>
            </PostContainer>
        </>
    )
}

const UrlContainer = styled.div`
    color: white;
    font-family: 'Lato';
`

const FeedContainer = styled.div`
    display: flex;
    flex-direction: column;

`

const TimelineTitle = styled.div`
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #FFFFFF;
    margin-top: 150px;
`

const TimelinePageContainer = styled.div`
    background: #333333;
    width: 100%;
    height: 100vh; /* Define a altura como 100% da viewport */
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
`;

const UserName = styled.p`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: #FFFFFF;
    margin-top: 19px;
`
const DescriptionContainer = styled.p`
    width: 502px;
    min-height: 52px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    color: #B7B7B7;
    margin-top: 7px;
`

const PublishContainer = styled.div`
    display: flex;
    width: 611px;
    height: 209px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    margin-top: 43px;
    margin-bottom: 13px;
`;

const PostContainer = styled.div`
    display: flex;
    width: 611px;
    height: 276px;
    background: #171717;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    margin-top: 16px;
`;

const ProfilePicture = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    background-color:blue;
    margin-top: 16px;
    background: url(${props => props.pictureUrl});
`
const ProfilePictureContainer = styled.div`
    width: 86px;
    height: 209px;
    display:flex;
    justify-content: center;
`



const PostContentContainer = styled.div`
    width: 503px;
    display:flex;
    flex-direction: column;
`
const ShareToday = styled.div`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
    color: #707070;
    height: 35px;
    margin: 0px;
    margin-top: 18px;
`

const UrlInput = styled.input`
    width: 100%;
    height: 30px;
    background: #EFEFEF;
    border-radius: 5px;
    border: none;
    padding-left:13px;
    ::placeholder{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 300;
        font-size: 15px;
        line-height: 18px;
        color: #949494;
    }
`

const DescriptionInput = styled.input`
    width: 100%;
    height: 66px;
    background: #EFEFEF;
    border-radius: 5px;
    border: none;
    margin-top: 5px;
    padding-left:13px;
    ::placeholder{
        vertical-align: top;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 300;
        font-size: 15px;
        line-height: 66px;
        color: #949494;
    }
`

const PublishButton = styled.button`
    width: 112px;
    height: 31px;
    background: #1877F2;
    border-radius: 5px;
    border: none;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #FFFFFF;
`
const PublishButtonContainer = styled.div`
    display: flex;
    justify-content: right;
    width: 100%;
    margin-top: 5px;
`