import styled from 'styled-components';

export const Container = styled.a`
  display:grid;
  grid-template-columns:2fr 1fr;
  border: 1px solid #4D4D4D;
  border-radius: 11px;
  text-align:left;
  max-height:168px;

  cursor:pointer;
`;

export const LeftColumn = styled.div`
    font-family: 'Lato';
    padding:24px 18px;
    align-items:flex-start !important;
    p{
        padding: 10px 0;
        font-size: 11px;
        font-weight: 400;
    }
    h2{
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        color: #CECECE;
        margin:0;
        padding-bottom:5px;
    }

    p:nth-child(2){
        color:#9B9595;
    }

    p:last-child{
        color: #CECECE;
    }
`;

export const RightColumn = styled.div`
    display:flex;
    align-items:center;
    overflow:hidden;
    max-height:167px;
    
    img{
        height:100%;
        max-width:100%;

        object-fit: cover;
        border-top-right-radius: 11px;
        border-bottom-right-radius: 11px;
    }
`;

export const ErrorContainer = styled.div`
  text-align:center;
  color:orange;
  width:470px;
`;
