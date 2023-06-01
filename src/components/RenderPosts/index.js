import { DescriptionContainer, PostContainer, PostContentContainer, UrlContainer, UserName } from "../../pages/TimelinePage/styles.js";
import BoldHashtag from "../BoldHashtags/index.jsx";
import LinkPreview from "../LinkPreview/index.jsx";
import { ProfilePicture, ProfilePictureContainer } from "../PublishPost/index.js";

export function RenderPosts(props) {
    const { picture_url, username, description, url } = props;
    return (
        <>
            <PostContainer>
                <ProfilePictureContainer>
                    <ProfilePicture
                        pictureUrl={picture_url}
                        onError={(e) => {
                            e.target.src = 'https://cdn.onlinewebfonts.com/svg/img_258083.png';
                        }}></ProfilePicture>
                </ProfilePictureContainer>
                <PostContentContainer>
                    <UserName>{username}</UserName>
                    <DescriptionContainer>
                        <BoldHashtag text={description} />
                    </DescriptionContainer>
                    <UrlContainer>
                        <LinkPreview url={url}></LinkPreview>
                    </UrlContainer>
                </PostContentContainer>
            </PostContainer>
        </>
    );
}