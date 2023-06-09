import React from 'react';

const BoldHashtag = ({ text }) => {
    const regex = /#(\w+)/g;
    const formattedText = text.replace(regex, '<strong>$&</strong>');
    return <span data-test="description" dangerouslySetInnerHTML={{ __html: formattedText }} />;
};

export default BoldHashtag;