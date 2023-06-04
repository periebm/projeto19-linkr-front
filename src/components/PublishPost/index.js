import { useState } from "react";
import { DescriptionInput, PostContentContainer, PublishButton, PublishButtonContainer, PublishContainer, ShareToday, UrlInput } from "../../pages/TimelinePage/styles.js";
import axios from "axios";
import styled from "styled-components";

const PublishPost = ({ posts, setPosts, token, setToken, setReload }) => {
  const url = `http://localhost:5000/posts`;
  const [form, setForm] = useState({ description: "", url: "", user_id: "" });
  const [isDisabled, setIsDisabled] = useState(false);
  const codedToken = JSON.parse(localStorage.getItem('userInfo'));

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value, user_id: token.id });
  };

  function fetchPosts() {
    axios.get(url)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => console.log('Erro ao buscar os posts', error.response));
  }

  const publish = (e) => {
    e.preventDefault();
    console.log(codedToken.token)
    const config = {
      headers: { authorization: `Bearer ${codedToken.token}` }
    };
    const promise = axios.post(url, form, config);
    setIsDisabled(true);
    promise
      .then((a) => {
        setIsDisabled(false);
        setForm({ description: "", url: "" });
        setReload(previous => !previous)
        fetchPosts();
      })
      .catch((a) => {
        alert("Houve um erro ao publicar seu link");
        setIsDisabled(false);
      });
  };

  return (
    <PublishContainer>
      <ProfilePictureContainer>
        <ProfilePicture pictureUrl={token.pictureUrl}></ProfilePicture>
      </ProfilePictureContainer>
      <PostContentContainer>
        <ShareToday>What are you going to share today?</ShareToday>
        <form onSubmit={publish}>
          <UrlInput disabled={isDisabled} type="text" placeholder='http://...' required onChange={handleChange} value={form.url} name='url'></UrlInput>
          <DescriptionInput disabled={isDisabled} type="text" placeholder='Awesome article about #javascript' onChange={handleChange} value={form.description} name='description'></DescriptionInput>
          <PublishButtonContainer>
            <PublishButton type="submit" disabled={isDisabled}>{isDisabled ? "Publishing..." : "Publish"}</PublishButton>
          </PublishButtonContainer>
        </form>
      </PostContentContainer>
    </PublishContainer>
  );
};

export default PublishPost;


export const ProfilePicture = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    background-color: blue;
    background-image: url(${props => props.pictureUrl});
    background-size: cover;
    background-position: center;
`;
export const ProfilePictureContainer = styled.div`
    width: 86px;
    height: 209px;
    display:flex;
    justify-content: center;
    margin-top:16px;
`;