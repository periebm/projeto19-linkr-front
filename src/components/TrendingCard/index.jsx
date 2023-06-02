import React, { useEffect, useReducer } from 'react';
import { Container, TrendingCardTitle } from "./styles";
import { Link } from "react-router-dom";
import TYPES from '../../constants/types';
import Trendings from '../../service/trendings';

const reducer = (state, action) => {
    switch (action.type) {
        case TYPES.FETCH_REQUEST:
            return { ...state, loading: true };
        case TYPES.FETCH_SUCCESS:
            return { ...state, error: "", trendings: action.payload, loading: false };
        case TYPES.FETCH_ERROR:
            return { ...state, error: action.payload, loading: false };
        default:
            return { ...state, loading: false };
    }
};

const TrendingCard = ({ reload }) => {
    const [{ loading, error, trendings }, dispatch] =
        useReducer(reducer, {
            trendings: [],
            loading: false,
            error: ''
        });

    useEffect(() => {
        const fetchTrendings = async () => {
            dispatch({ type: TYPES.FETCH_REQUEST });
            try {
                const response = await Trendings.getTrendings();
                dispatch({ type: TYPES.FETCH_SUCCESS, payload: response });
            } catch (error) {
                dispatch({ type: TYPES.FETCH_ERROR, payload: error.message });
            }
        };
        console.log("reload")
        fetchTrendings();
    }, [reload]);

    return (
        <Container>
            <TrendingCardTitle>
                <h2>trending</h2>
            </TrendingCardTitle>
            <div>
                {trendings?.map((trending) => (
                    <div key={trending.name}>
                        <p>
                            <Link
                                to={`/timeline/hashtag/${trending.name}`}
                            >
                                # {trending.name}
                            </Link>
                        </p>
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default TrendingCard;
