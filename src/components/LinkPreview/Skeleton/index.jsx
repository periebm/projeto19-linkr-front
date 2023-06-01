import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonLinkPreview = () => {
    return (
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <Skeleton style={{
                height:"160px", 
                width:"480px",
                borderRadius: "15px",
                }} />
        </SkeletonTheme>

    );
};

export default SkeletonLinkPreview;
