import React from 'react';
import './index.scss';

import Container from '../../ui/Container';

import Profile from './components/Profile';
import PostWrite from './components/PostWrite';
import Posts from './components/Posts';
import Navbar from 'components/Navbar';

const Home = () => {
  return (
    <>
      <Navbar />
      <Container>
        <div className="home-grid">
          <Profile />
          <main>
            <PostWrite />
            <Posts />
          </main>
        </div>
      </Container>
    </>
  );
};

export default Home;
