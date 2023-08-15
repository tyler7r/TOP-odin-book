import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Profile } from './components/Profile/Profile';
import { FriendIndex } from './components/User/FriendIndex';
import { UserIndex } from './components/User/UserIndex';
import { SearchHome } from './components/SearchViews/SearchHome';
import { ExpandPost } from './components/Post/ExpandPost';

function App() {
  const site = 'https://top-odinbook.netlify.app/'
  const host = 'https://top-odinbook-0b5f675079ea.herokuapp.com'

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path={`${site}/odinbook/g/home`} element={<Home host={host} />} />
          <Route path='/odinbook/g/users/:userId' element={<Profile />} />
          <Route path='/odinbook/g/users/index' element={<UserIndex />} />
          <Route path='/odinbook/g/users/:userId/friends' element={<FriendIndex />} />
          <Route path='/odinbook/g/search/:topic' element={<SearchHome />} />
          <Route path='/odinbook/g/:postId' element={<ExpandPost />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
