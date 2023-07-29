import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Home } from './components/Home';
import { Profile } from './components/ProfileComponents/Profile';
import { UserIndex } from './components/UserComponents/UserIndex';
import { SearchHome } from './components/SearchViews/SearchHome';
import { FriendIndex } from './components/UserComponents/FriendIndex';
import { ExpandPost } from './components/PostComponents/ExpandPost';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const checkToken = localStorage.getItem('token')
    const checkUser = localStorage.getItem('user')

    if (checkToken !== 'undefined' && checkToken !== 'null') {
      let parseToken = JSON.parse(localStorage.getItem('token'))
      setToken(`Bearer ${parseToken}`)
    }
    if (checkUser !== 'undefined' && checkUser !== 'null') {
      let parseUser = JSON.parse(localStorage.getItem('user'));
      setUser(parseUser);
    }
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/odinbook' element={<Home token={token} user={user} />} />
          <Route path='/odinbook/login' element={<Login setToken={setToken} setUser={setUser} />} />
          <Route path='/odinbook/signup' element={<Signup />} />
          <Route path='/odinbook/users/:userId' element={<Profile user={user} setUser={setUser} token={token} />} />
          <Route path='/odinbook/users/index' element={<UserIndex token={token} user={user} />} />
          <Route path='/odinbook/users/:userId/friends' element={<FriendIndex user={user} token={token} />} />
          <Route path='/odinbook/search/:topic' element={<SearchHome token={token} user={user} />} />
          <Route path='/odinbook/:postId' element={<ExpandPost token={token} user={user} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
