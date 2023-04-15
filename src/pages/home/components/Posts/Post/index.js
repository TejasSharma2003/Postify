import { useState, useEffect } from 'react';
import './index.scss';

import Avatar from 'components/Avatar';
import Comment from 'components/Comment';
import DeleteDoc from 'components/DeleteDoc';

import Comments from './Comments';
import SavePost from '../../SavePost';

import LikeOutline from './Like/LikeOutline';
import LikeFill from './Like/LikeFill';

import CommentSvg from './CommentSvg';


import { useAddReactionMutation, useRemoveReactionMutation, useDeletePostMutation } from 'features/posts/postSlice';

import { useSelector } from 'react-redux';
import { useGetUserQuery } from 'features/user/userSlice';

import UseAnimation from 'react-useanimations';
import heart from 'react-useanimations/lib/heart';
import star from 'react-useanimations/lib/star';
import { useGetSavedPostsQuery } from 'features/savedPost/savedPostSlice';


const Post = (props) => {
  const { userId, token } = useSelector(state => state.auth);

  const [addReaction] = useAddReactionMutation();
  const [removeReaction] = useRemoveReactionMutation();
  const [deletePost] = useDeletePostMutation();

  const [isLiked, setIsLiked] = useState(false);
  const [showComment, setShowComment] = useState(false);

  //Setting post to a liked post initially when it's rendered
  useEffect(() => {
    if (!props.isSuccess) return;

    if (props.likedBy?.includes(userId)) {
      setIsLiked(true);
    }


  }, [props.isSuccess])

  const onLikeHandler = async () => {
    setIsLiked((pre) => !pre);
    if (isLiked) {
      await removeReaction({ postId: props.postId, token });

    }
    else {
      await addReaction({ postId: props.postId, token });
    }
  };

  const onToggleShowComment = () => {
    setShowComment(pre => !pre);
  }

  return (
    <div className="post">
      <div className="post__container">
        {userId === props.author._id ?
          <DeleteDoc action={deletePost} reqObj={{ docId: props.postId, token }} />
          : ''
        }
        <div className="post__author-content">
          <Avatar className="post__author" avatar={props.author.avatar} />
          <h4 className="post__author-name">{props.author.name}</h4>
        </div>
        {props.postImage && (
          <div className="post__image">
            <img
              src={`http://localhost:4000/assets/posts/${props.postImage}`}
              alt="post-img"
            />
          </div>
        )}
        {props.content &&
          <div style={{ display: 'flex', padding: '.5rem 1rem' }}>
            <h6 style={{ whiteSpace: 'nowrap' }}>{props.author.name}</h6>
            <p className="post__content">{props.content}</p>
          </div>
        }
        <div style={{ padding: '0rem 1rem' }}>
          <div className="post__action-icons">
            <div className="post__action">
              <span onClick={onLikeHandler}>
                {isLiked ? <LikeFill /> : <LikeOutline />}
              </span>
            </div>
            <div className="post__action">
              <span onClick={onToggleShowComment}>
                <CommentSvg />
              </span>
            </div>
            <div className="post__action post__action--save">
              <SavePost postId={props.postId} />

            </div>
          </div>
          <div className="post__detail">
            <span className="post__count">{props.likes} likes</span>
            <span className="post__count">{props.comments?.length} comments</span>
            {/* <div className="post__caption">
              <h6>{props.author.name}</h6>
              <span>{props.caption}</span>
            </div> */}
          </div>

          {showComment && <Comments comments={props.comments} />}
          <Comment setShowComment={setShowComment} showComment={showComment} author={props?.author} postId={props.postId} />
        </div>
      </div>
    </div >
  );
};

export default Post;
