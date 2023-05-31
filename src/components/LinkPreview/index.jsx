import Axios from 'axios';
import React, { useState, useEffect, useReducer } from 'react';
import SkeletonLinkPreview from './Skeleton';
import TYPES from "../../constants/types";
import Error_505 from "../../assets/error_505.png";

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
                const response = await Axios.get(`https://favorited-link-preview.herokuapp.com/api/link-preview?url=${url}`);
                dispatch({ type: TYPES.FETCH_SUCCESS, payload: response });
            } catch (error) {
                dispatch({ type: TYPES.FETCH_ERROR, payload: error.message });
            }
        };
        fetchUrl();

    }, []);

    const handleRedirect = () => {
        window.open(url, '_blank'); // Substitua com o link desejado
    };

    return (
        <>
            {loading ?
                <SkeletonLinkPreview /> :
                error ? (
                    <ErrorContainer>
                        <p>Oops! An error ocurred! <br/> failed to get URL informations</p>
                    </ErrorContainer>
                ) :
                    (
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
