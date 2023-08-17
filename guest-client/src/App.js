import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Profile } from './components/Profile/Profile';
import { FriendIndex } from './components/User/FriendIndex';
import { UserIndex } from './components/User/UserIndex';
import { SearchHome } from './components/SearchViews/SearchHome';
import { ExpandPost } from './components/Post/ExpandPost';

function App() {
  const host = process.env.REACT_APP_HOST_URL
  const server = process.env.REACT_APP_SERVER_URL

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/odinbook/g/home' element={<Home host={host} server={server} />} />
          <Route path='/odinbook/g/users/:userId' element={<Profile host={host} server={server} />} />
          <Route path='/odinbook/g/users/index' element={<UserIndex host={host} server={server} />} />
          <Route path='/odinbook/g/users/:userId/friends' element={<FriendIndex host={host} server={server} />} />
          <Route path='/odinbook/g/search/:topic' element={<SearchHome host={host} server={server} />} />
          <Route path='/odinbook/g/:postId' element={<ExpandPost host={host} server={server} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
