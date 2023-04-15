import { useState } from 'react';

import './index.scss';

import { useSelector } from 'react-redux';

import { useAddNewPostMutation, useGetPostsQuery } from 'features/posts/postSlice';

import Avatar from 'components/Avatar';
import Loading from 'components/Loading';

import { MdOutlineFileUpload } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';

import Button from 'elements/Button';
import { useGetUserQuery } from 'features/user/userSlice';
import AvatarPh from 'components/AvatarPh';

const PostWrite = () => {
  const { token, userId } = useSelector((state) => state.auth);
  const { data: response, isLoading: getUserIsLoading } = useGetUserQuery({ userId, token });

  const user = response?.data;

  const [postText, setPostText] = useState('');
  const [file, setFile] = useState('');
  const [previewFile, setPreviewFile] = useState('');

  const [addNewPost, { isLoading }] = useAddNewPostMutation();


  const onUploadHandler = (event) => {
    const file = event.target.files[0];
    setPreviewFile(URL.createObjectURL(file));
    setFile(file);
  };

  const onInputTriggerHandler = () => {
    const inputFile = document.getElementById('postImageInput');
    if (inputFile) {
      inputFile.click();
    }
  }

  const onAddNewPost = async (e) => {
    e.preventDefault();
    try {

      if (!file && !postText) return;
      console.log(postText)

      const form = new FormData();

      if (file) {
        form.append('postImage', file);
      }
      if (postText) {
        form.append('content', postText);
      }
      const res = await addNewPost({ form, token }).unwrap();

      console.log(res);
      console.log('Success!');
      setPostText('');
      setFile('');
      setPreviewFile('');
    } catch (err) {
      console.log(err);
    }
  };

  const onInputHandler = (e) => {
    const { value } = e.target;
    setPostText(value);
  };

  return (
    <div className="post-note">
      <div className="post-note__container">
        <div className="post-note__user">
          {getUserIsLoading ? <AvatarPh className="post-note__avatar-ph"/>
            :
            <Avatar className="post-note__user-img" />
          }
        </div>
        <input type="text" className='post-note__post-input' onChange={onInputHandler} value={postText} placeholder={`What's on your mind ${user?.name.toUpperCase()} ?`} />
      </div>
      <form className='post-note__form'>
        <span className='post-note__icon-upload' onClick={onInputTriggerHandler}>{<MdOutlineFileUpload style={{ fontSize: '3rem', marginRight: '.5rem' }} />}Upload Image</span>

        <input
          name="postImage"
          type="file"
          onChange={onUploadHandler}
          id="postImageInput"
          style={{ display: 'none' }}
        />

        <Button onClick={onAddNewPost} className="btn--fill post-note__btn">
          {isLoading ? <Loading size={25} /> : <span>Post</span>}
        </Button>
      </form>
      <div className='post-note__preview-box'>
        {previewFile ?
          <>
            <span onClick={() => setPreviewFile('')} className='delete__btn'>{<RxCross2 />}</span>
            <img className="post-note__preview-img" src={previewFile} />
          </>
          : ''
        }
      </div>
    </div>
  );
};

export default PostWrite;
