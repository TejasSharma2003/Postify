import { useState } from 'react'
import './index.scss';

import Avatar from 'components/Avatar'
import Loading from 'components/Loading';

import Button from 'elements/Button'
import { useAddCommentMutation } from 'features/comment/commentSlice';
import { useSelector } from 'react-redux';
import axios from 'api/axios';

import useAxiosPrivate from 'hooks/useAxiosPrivate';
import showNotification from 'ui/showNotification';

const Comment = (props) => {
    const { token } = useSelector(state => state.auth);
    const axiosPrivate = useAxiosPrivate();
    const postId = props.postId;

    const [showPlaceHolder, setShowPlaceHolder] = useState(true);
    const [comment, setComment] = useState('');
    const [addComment, { isLoading }] = useAddCommentMutation();

    const onChangeHandler = (e) => {
        const { value } = e.target;
        setComment(value);
    }

    const onAddComment = async () => {
        if (!comment) return;
        try {
            const res = await addComment({ comment, postId, token });
            showNotification('Commented', 'success');
            setComment('');
            if (!props.showComment) {
                props.setShowComment(true);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className="post__comment">
                <Avatar className="post__comment-avatar" />
                <textarea className="comment__write" placeholder='What are your thought about this post ?' onChange={onChangeHandler} value={comment} ></textarea>
                <Button onClick={onAddComment} className="post__comment-btn btn--fill">{isLoading ? <Loading/> : <span>Go!</span>}</Button>
            </div>
        </>

    )
}

export default Comment