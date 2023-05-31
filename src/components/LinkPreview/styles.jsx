import styled from 'styled-components';

export const Container = styled.div`
  display:grid;
  grid-template-columns:2fr 1fr;
  border: 1px solid #4D4D4D;
  border-radius: 11px;
  text-align:left;

  cursor:pointer;
`;

export const LeftColumn = styled.div`
    font-family: 'Lato';
    padding:24px 18px;
    align-items:flex-start !important;
    gap:10px;

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
        padding-top:10px;
        color: #CECECE;
    }
`;

export const RightColumn = styled.div`
    display:flex;
    align-items:center;
    overflow:hidden;

    img{
        width:100%;
        height:100%;

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