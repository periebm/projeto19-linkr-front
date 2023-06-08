import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonTrending = () => {
    return (
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
            {[...Array(6)].map((_, i) => (
                <Skeleton key={i} style={{
                    height: "280px",
                    width: "600px",
                    borderRadius: "15px",
                    marginBottom:"20px"
                }} />
            ))}
        </SkeletonTheme>
    );
};

export default SkeletonTrending;
