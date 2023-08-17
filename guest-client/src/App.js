import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Profile } from './components/Profile/Profile';
import { FriendIndex } from './components/User/FriendIndex';
import { UserIndex } from './components/User/UserIndex';
import { SearchHome } from './components/SearchViews/SearchHome';
import { ExpandPost } from './components/Post/ExpandPost';

function App() {
  const server = process.env.REACT_APP_SERVER_URL

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/odinbook/g/home' element={<Home server={server} />} />
          <Route path='/odinbook/g/users/:userId' element={<Profile server={server} />} />
          <Route path='/odinbook/g/users/index' element={<UserIndex server={server} />} />
          <Route path='/odinbook/g/users/:userId/friends' element={<FriendIndex server={server} />} />
          <Route path='/odinbook/g/search/:topic' element={<SearchHome server={server} />} />
          <Route path='/odinbook/g/:postId' element={<ExpandPost server={server} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
