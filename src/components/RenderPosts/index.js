import { DescriptionContainer, PostContainer, PostContentContainer, UrlContainer, UserName } from "../../pages/TimelinePage/styles.js"
import LinkPreview from "../LinkPreview/index.jsx"
import { ProfilePicture, ProfilePictureContainer } from "../PublishPost/index.js"

export function RenderPosts(props) {
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
                    <UrlContainer>
                        <LinkPreview url={url}></LinkPreview>
                    </UrlContainer>

                </PostContentContainer>
            </PostContainer>
        </>
    )
}