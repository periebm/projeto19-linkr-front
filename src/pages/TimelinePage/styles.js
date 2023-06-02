import styled from "styled-components";

export const UrlContainer = styled.div`
    color: white;
    font-family: 'Lato';
`

export const FeedContainer = styled.div`
    display: flex;
    flex-direction: column;

`

export const TimelineTitle = styled.div`
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #FFFFFF;
    margin-top: 73px;
`

export const TimelinePageContainer = styled.div`
    background: #333333;
    width: 100%;
    height: 100vh; /* Define a altura como 100% da viewport */
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
`;

export const UserName = styled.p`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: #FFFFFF; 
`
export const DescriptionContainer = styled.p`
    width: 502px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    color: #B7B7B7;
    margin-top: 10px;
    margin-bottom:10px;
`

export const PublishContainer = styled.div`
    display: flex;
    width: 611px;
    height: 209px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    margin-top: 43px;
    margin-bottom: 13px;
`;

export const PostContainer = styled.div`
    display: flex;
    width: 611px;
    height: 276px;
    background: #171717;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    margin-top: 16px;
    padding: 18px;
    padding-left:0px;
`;

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
`

export const PostContentContainer = styled.div`
    width: 503px;
    display:flex;
    flex-direction: column;
    position: relative;
`

export const ShareToday = styled.div`
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

export const UrlInput = styled.input`
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

export const DescriptionInput = styled.input`
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

export const PublishButton = styled.button`
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
export const PublishButtonContainer = styled.div`
    display: flex;
    justify-content: right;
    width: 100%;
    margin-top: 5px;
`