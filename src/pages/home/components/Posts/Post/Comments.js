import SingleComment from 'components/SingleComment'
import React from 'react'

import { useSelector } from 'react-redux'

const Comments = (props) => {
    const { userId:loggedUserId } = useSelector(state => state.auth);

    let content;

    if (props.comments.length === 0) {
        content = <p style={{ fontSize: '1.3rem' }}>No comments yet, Be the first one to comment</p>
    }
    else {
        content = props.comments.map(comment => {
            const id = comment._id;
            return <SingleComment key={id} comment={comment} loggedUserId={loggedUserId} />
        })
    }
    return (
        <>
            {content}
        </>
    )
}

export default Comments