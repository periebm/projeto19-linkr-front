import styled from 'styled-components';

export const Container = styled.div`
  background-color:#171717;
  width:301px;
  max-height:406px;
  color:white;
  border-radius: 16px;
  font-family:"lato", sans-serif;

  a{
    color:white;
    text-decoration:none;
  }

  p{
    text-transform:lowercase;
    font-weight: 700;
    font-size:19px;
    padding:0 16px;
    margin-top:10px;

  }
`;

export const TrendingCardTitle = styled.div`
   h2{
      font-size: 27px;
      font-weight: 700;
      font-family: "Oswald Variable", sans-serif;
      padding:16px;
    }

    &::after{
      content:"";
      display:block;
      width:100%;
      height:1px;
      background-color:#484848;
      margin-bottom:22px;
    }
`;