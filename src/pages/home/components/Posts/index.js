import { useState, useMemo } from 'react';
import './index.scss';

import { useGetPostsQuery } from 'features/posts/postSlice';

import Button from 'elements/Button';

import Post from './Post';
import Avatar from 'components/Avatar';
import Spinner from 'components/Spinner';
import Loading from 'components/Loading';

const Posts = () => {
  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error,
    isFetching,
    refetch,
  } = useGetPostsQuery();

  let content;

  if (isLoading) {
    content = <Spinner />
    //Spinner
  } else if (isSuccess) {
    if (posts.data.length === 0) {
      content = <div className='posts__no-post-msg'>
  
        <p className='posts__message'>Nothing here go home or post something :)</p>
      </div>
    }
    else {
      content = posts.data.map((post) => (
        <Post
          key={post.id}
          postImage={post.postImage}
          postId={post.id}
          title={post.title}
          content={post.content}
          author={post.postedBy}
          likes={post.likeCount}
          caption={post.caption}
          comments={post?.comments}
          likedBy={post.likedBy}
          isSuccess={isSuccess}
        />
      ));
    }

  } else if (error) {
    console.log(error);
  }
  return (
    <div className={`posts ${isFetching && 'posts--fetch-fade'}`}>
      {/* <Button className='btn--ghost'onClick={refetch}>Refresh posts</Button > */}
      <div className="posts__container">{content}</div>
    </div>
  );
};

export default Posts;
