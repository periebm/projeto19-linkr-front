import styled from 'styled-components';
import '@fontsource/lato/100.css';
import '@fontsource/lato/300.css';
import '@fontsource/lato/400.css';
import '@fontsource/lato/700.css';
import '@fontsource/lato/900.css';
import '@fontsource-variable/oswald';

export const Container = styled.div`
  max-width:980px;
  margin: 0 auto;

  h1{
    color:white;
    font-family:"Oswald Variable", sans-serif;
    font-weight: 700;
    font-size: 43px;
    margin:85px 0 41px;
  }
`;

export const PostsArea = styled.div`
  display:flex;
  flex-direction:column;
`;


export const MainContent = styled.main`
  display:flex;
  gap:25px;

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
        border-radius:50%;
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

        p{
          margin:10px 0;

          strong{
            font-weight: 700;
          }
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

