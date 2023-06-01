// import Axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import SkeletonLinkPreview from './Skeleton';
import TYPES from "../../constants/types";
import urlMetadata from "url-metadata";

import { Container, LeftColumn, RightColumn, ErrorContainer } from './styles';

const reducer = (state, action) => {
    switch (action.type) {
        case TYPES.FETCH_REQUEST:
            return { ...state, loading: true };
        case TYPES.FETCH_SUCESSS:
            return { ...state, error: "", link: action.payload, loading: false };
        case TYPES.FETCH_ERROR:
            return { ...state, error: action.payload, loading: false };
        default:
            return { ...state, loading: false };
    }
};

const LinkPreview = ({ url }) => {
    const [{ loading, error, link }, dispatch] =
        useReducer(reducer, {
            link: null,
            loading: false,
            error: ''
        });

    useEffect(() => {

        const fetchUrl = async () => {
            dispatch({ type: TYPES.FETCH_REQUEST });
            try {
                const response = await urlMetadata(`https://cors-anywhere-nxl6.onrender.com/${url}`);
                dispatch({ type: TYPES.FETCH_SUCESSS, payload: response });
                console.log(response)
            } catch (error) {
                dispatch({ type: TYPES.FETCH_ERROR, payload: error.message });
            }
        };
        fetchUrl();

    }, []);

    const handleRedirect = () => {
        window.open(url, '_blank');
    };

    return (
        <>
            {loading ?
                <SkeletonLinkPreview /> :
                error ? (
                    <ErrorContainer>
                        <p>Oops! An error ocurred! <br /> failed to get URL informations</p>
                    </ErrorContainer>
                ) :
                    (
                        <Container onClick={() => handleRedirect()}>
                            <LeftColumn>
                                <h2>{link && link["og:title"]}</h2>
                                <p>{link?.description}</p>
                                <p>{url}</p>
                            </LeftColumn>
                            <RightColumn>
                                <img src={link && link["og:image"]} alt="" />
                            </RightColumn>
                        </Container>
                    )}
        </>
    );
};

export default LinkPreview;
