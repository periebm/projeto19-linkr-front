import React, { useEffect } from 'react';
import Posts from '../../service/posts';

const TrendingPage = () => {
    const [posts, setPosts] = React.useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await Posts.getPosts();
            setPosts(response);
        }

        fetchPosts();
    }, []);

    return (
        <div>
            
        </div>
    );
};

export default TrendingPage;
