import styled from 'styled-components';
import '@fontsource/lato/100.css';
import '@fontsource/lato/300.css';
import '@fontsource/lato/400.css';
import '@fontsource/lato/700.css';
import '@fontsource/lato/900.css';

export const Container = styled.div`
  max-width:900px;
  margin: 0 auto;

  h1{
    color:white;
    font-family:"lato", sans-serif;
  }
`;

export const PostsArea = styled.div`
  display:flex;
  flex-direction:column;
  gap:16px;
`;

export const TrendingCard = styled.div`
  
`;

export const MainContent = styled.main`
  display:flex;
`;

export const PostForm = styled.div`
    display:flex;
    background-color:#171717;
    color:#fff;
    width:590px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    padding: 18px;
    gap:18px;
    font-family:"lato", sans-serif;
    
    
  div:nth-child(1){
    display:flex;
    flex-direction:column;
    align-items:center;

    img{
        width:50px;
    }

    svg{
        font-size:20px;
        margin-top:15px;
        margin-bottom:3px;
        cursor:pointer;
    }

    p{
        margin:0;
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
    }
  }

  div:nth-child(2){
        h4{
            font-style: normal;
            font-weight: 400;
            font-size: 19px;
            text-transform:capitalize;
        }
    }

  h4{
    font-family: "Lato", sans-serif;
    font-weight: 300;
    font-size: 20px;
    font-style:normal;
    margin:0;
  }
`;

export const Input = styled.input`
  
`;