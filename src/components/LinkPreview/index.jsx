import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import SkeletonLinkPreview from './Skeleton';

import { Container, LeftColumn, RightColumn } from './styles';

const LinkPreview = ({ url }) => {
    const [link, setLink] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUrl = async () => {
            setLoading(true);
            try {
                const response = await Axios.get(`https://favorited-link-preview.herokuapp.com/api/link-preview?url=${url}`);
                console.log(response.data);
                setLink(response.data.result);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchUrl();

    }, []);

    const handleRedirect = () => {
        window.open(url, '_blank'); // Substitua com o link desejado
    };

    return (
        <>
            {loading ? <SkeletonLinkPreview /> : (
                <Container onClick={() => handleRedirect()}>
                    <LeftColumn>
                        <h2>{link?.siteData.title}</h2>
                        <p>{link?.siteData.description}</p>
                        <p>{link?.siteData.url}</p>
                    </LeftColumn>
                    <RightColumn>
                        <img src={link?.siteData.image} alt="" />
                    </RightColumn>
                </Container>
            )}
        </>
    );
};

export default LinkPreview;
