import { useEffect, useState, useRef } from 'react';

import './index.scss';

import Avatar from 'components/Avatar';
import AvatarPh from 'components/AvatarPh';
import PreviewImg from 'components/PreviewImg';

import { Link } from 'react-router-dom';
import axios from 'api/axios';

import { CiSaveDown2, CiHome } from 'react-icons/ci';
import { IoSettingsOutline } from 'react-icons/io5';
import { BsPeople } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';

import { useGetUserQuery } from 'features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

import { authActions } from 'features/auth/authSlice';
import Button from 'elements/Button';



const Profile = () => {
  const textAreaRef = useRef();

  const { userId, token } = useSelector((state) => state.auth);

  const { data: response, refetch, isLoading: getUserIsLoading } = useGetUserQuery({ userId, token });

  const user = response?.data;

  const [file, setFile] = useState('');
  const [coverFile, setCoverFile] = useState('');
  const [isProfileEditable, setIsProfileEditable] = useState(false);
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [AvatarPreview, setAvatarPreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  useEffect(() => {
    setName(user?.name);
    setAbout(user?.about);
  }, [user])

  //textarea height auto fit to content passing isProfileEditable to the dependancy 'cause text area is not rendered at first so the current property will be null. but when we click edit profile the textarea renders and we then set dynamic height.
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight + 3}px`;
    }

  }, [isProfileEditable, textAreaRef.current])

  const onEditHandler = () => {
    if (isProfileEditable) return;
    setIsProfileEditable(true);
  }

  const onInputSelectHandler = () => {
    const imageInput = document.getElementById('fileInput');
    if (imageInput) {
      imageInput.click();
    }
  }

  const onInputSelectHandlerCover = () => {
    const imageInputCover = document.getElementById('fileInputCover');
    if (imageInputCover) {
      imageInputCover.click();
    }
  }

  const onSaveHandler = async () => {
    try {
      if (!file && !coverFile && !name) return;
      const form = new FormData();
      if (file) {
        form.append('avatar', file);
      }
      if (coverFile) {
        form.append('coverImage', coverFile);
      }
      if (name) {
        form.append('name', name);
      }
      if (about) {
        form.append('about', about);
      }

      const res = await axios.patch('/users/update-me', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
          withCredentials: true,
        }
      })
      refetch();
      setFile('');
      setCoverFile('');
      setName('');
      setIsProfileEditable(false);
      setAvatarPreview('');
      setCoverPreview('');
    } catch (err) {
      console.log(err);
    } finally {
      setFile('')
    }
  }

  const onCancelHandler = () => {
    setIsProfileEditable(false);
    setFile('');
    setAvatarPreview(null);
    setCoverPreview(null);
    setName(user.name);
    setAbout(user.about);
  }

  const onImageChangeHandler = (e) => {
    const file = e.target.files[0];
    setAvatarPreview(URL.createObjectURL(file));
    setFile(file);
  }

  const onImageChangeHandlerCover = (e) => {
    const coverFile = e.target.files[0];
    setCoverPreview(URL.createObjectURL(coverFile));
    setCoverFile(coverFile);
  }

  return (
    <div className="profile-peek">
      <div className="profile-peek__container">
        {getUserIsLoading ?
          <div className='ph-item profile-peek__coverimg-ph'>
            <div class="ph-picture profile-peek__coverimg-ph-item"></div>
          </div>
          :
          <div className='profile-peek__coverbg-box' onClick={onInputSelectHandlerCover}>
            <i className='profile-peek__coverbg-icon'></i>
            {coverPreview ?
              <PreviewImg src={coverPreview} className="profile-peek__cover" />
              :
              <div
                style={{
                  backgroundImage: `url(http://localhost:4000/assets/users/${user?.coverImage})`,
                }}
                className="profile-peek__cover"
              ></div>
            }
          </div>
        }

        <input type="file" id="fileInputCover" onChange={onImageChangeHandlerCover} style={{ display: 'none' }} />


        <div className="profile-peek__user">
          {getUserIsLoading ?
            <AvatarPh className="profile-peek__avatar-ph" />
            :
            <div className='profile-peek__avatar-box' onClick={onInputSelectHandler} >
              <i className='profile-peek__camera-icon'></i>
              {AvatarPreview ?
                <PreviewImg className="avatar profile-peek__image" src={AvatarPreview} />
                :
                <Avatar avatar={user?.avatar} className="profile-peek__image" />
              }
            </div>
          }
          <input type="file" id="fileInput" onChange={onImageChangeHandler} style={{ display: 'none' }} />

          {getUserIsLoading ?
            <div className="ph-item" style={{ border: 'none', padding: '0px' }}>
              <div className="ph-col-12">
                <div className="ph-row" style={{ justifyContent: 'center' }}>
                  <div className="ph-col-8 big" style={{ height: '20px', marginBottom: '10px' }}></div>
                  <div className='ph-col-12'></div>
                  <div className='ph-col-8'></div>
                  <div className='ph-col-6'></div>
                </div>
              </div>
            </div>

            :
            <div className='profile-peek__user-detail'>

              {isProfileEditable ? <input type="text" className="profile-peek__edit-input" value={name} onChange={(e) => setName(e.target.value)} />
                :
                <h3 onInput={(e) => setName(e.target.textContent)}
                  className="profile-peek__name">{user?.name.toUpperCase()}
                </h3>
              }

              {isProfileEditable ? <textarea ref={textAreaRef} type="text" className="profile-peek__edit-input profile-peek__about-edit" value={about} onChange={(e) => setAbout(e.target.value)} />
                :
                <p className="profile-peek__about">{user?.about}</p>
              }
            </div>
          }


          {!isProfileEditable
            &&
            <span className="profile-peek__edit-icon" onClick={onEditHandler}>Edit profile <FiEdit /></span>
          }

          {(file || coverFile) || isProfileEditable ?
            <div className='profile-peek__change-btn-wrap'>
              <Button onClick={onSaveHandler} className="btn--fill profile-peek__save-btn">Save Changes</Button>
              <Button onClick={onCancelHandler} className="btn--ghost profile-peek__save-btn">Cancel Changes</Button>
            </div>

            : ''
          }
        </div>
      </div>

      {/* <ul className="profile-peek__links">
        <li>
          <Link className="profile-peek__link" to="/">
            <CiSaveDown2 className="profile-peek__icon" />
            Saved posts
          </Link>
        </li>
        <li>
          <Link className="profile-peek__link" to="/">
            <IoSettingsOutline className="profile-peek__icon" />
            Profile settings
          </Link>
        </li>
        <li>
          <Link className="profile-peek__link" to="/">
            <BsPeople className="profile-peek__icon" />
            Friend list
          </Link>
        </li>
      </ul> */}
    </div>
  );
};

export default Profile;
