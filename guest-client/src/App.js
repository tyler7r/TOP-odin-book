import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Profile } from './components/Profile';
import { FriendIndex } from './components/FriendIndex';
import { UserIndex } from './components/UserIndex';
import { SearchHome } from './components/SearchHome';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/odinbook/g' element={<Home />} />
          <Route path='/odinbook/g/users/:userId' element={<Profile />} />
          <Route path='/odinbook/g/users/index' element={<UserIndex />} />
          <Route path='/odinbook/g/users/:userId/friends' element={<FriendIndex />} />
          <Route path='/odinbook/g/search/:topic' element={<SearchHome />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
