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
              
import React, { useEffect, useReducer } from 'react';
import SkeletonLinkPreview from './Skeleton';
import TYPES from "../../constants/types";

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
                console.log(response.data)
                dispatch({ type: TYPES.FETCH_SUCESSS, payload: response.data.result });
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
