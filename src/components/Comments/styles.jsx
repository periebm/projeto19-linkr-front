import styled from 'styled-components';

export const Container = styled.div`
  color:white;
  font-family: 'Lato';
  font-style: normal;
  margin-top:-15px;
  transition: all .6s ease;
  height: ${({ isOpen }) => !isOpen ? '0' : '200px'};
  overflow: ${({ isOpen }) => !isOpen ? 'hidden' : 'visible'};
  margin-bottom:${({ isOpen }) => !isOpen ? '36px' : '80px'};
 
  form{
    background-color:#1E1E1E;
    display:flex;
    align-items:center;
    padding:14px 25px;
    gap:14px;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    position:relative;
    transition: opacity .6s ease;
    opacity: ${({ isOpen }) => !isOpen ? '0.1' : '1'};

    img{
        width:40px;
        border-radius:50%;
    }

    button{
        background:transparent;
        border:0;
        position:absolute;
        top:25px;
        right:40px;
        cursor:pointer;

        .send{
            width:18px;
        }
    }

    input{
        padding:11px 15px;
        width:100%;
        max-width:510px;
        background-color:#252525;
        border-radius:8px;
        border:0;
        color:#fff;   

        &::placeholder{
            color:#999999;
        }
    }
  }
`;

export const CommentList = styled.ul`
    background: #1E1E1E;
    padding-top:20px;
    max-height:200px;
    overflow-y:auto;

    transition: all .6s ease;
    height: ${({ isOpen }) => !isOpen ? '0' : '200px'};


    .highlight{
        color: #565656;
        padding-left:4px;
        font-weight: 400 !important;
    }

    li{
        height:71px;
        border-bottom:1px solid #353535;
        display:flex;
        align-items:center;
        gap:18px;
        margin:0 25px;

        div{
            display:flex;
            flex-direction:column;
            gap:3px;

            span:nth-child(1){
                font-weight: 700;
                font-size:14px;
            }

            span:nth-child(2){
                font-weight: 400;
                font-size:14px;
                color:#ACACAC;
            }
        }
    }

    img{
        width:40px;
        border-radius:50%;
    }
`;
