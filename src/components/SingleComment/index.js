import React from 'react'
import styles from './index.module.css';

import { useRemoveCommentMutation } from 'features/comment/commentSlice';

import Avatar from 'components/Avatar';
import DeleteDoc from 'components/DeleteDoc';


const SingleComment = (props) => {
    const [removeComment, { isLoading }] = useRemoveCommentMutation();

    return (
        <div className={styles['comment-box']}>
            <Avatar className={styles['user-picture']} avatar={props.comment.user.avatar} />
            <div className={styles.content}>
                <div>
                    <h4 className={styles['user-name']}>{props.comment.user.name}</h4>
                    <p className={styles.comment}>{props.comment.comment}</p>
                </div>
                {props.loggedUserId === props.comment.user.id ?
                    <DeleteDoc action={removeComment} reqObj={{ commentId: props.comment._id, 
                    postId: props.comment.post?.id || props.comment.post }} />
                    : ''
                }
            </div>
        </div>
    )
}

export default SingleComment