import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Home } from './components/Home';
import { Profile } from './components/Profile';
import { UserIndex } from './components/UserIndex';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [updateUser, setUpdateUser] = useState(false);

  useEffect(() => {
    const checkToken = localStorage.getItem('token')
    const checkUser = localStorage.getItem('user')

    if (checkToken !== 'undefined' || null) {
      let parseToken = JSON.parse(localStorage.getItem('token'))
      setToken(`Bearer ${parseToken}`)
    }
    if (checkUser !== 'undefined' || null) {
      let parseUser = JSON.parse(localStorage.getItem('user'));
      setUser(parseUser);
    }
  }, [])

  useEffect(() => {
    if (updateUser === true) {
      const userInfo = JSON.parse(localStorage.getItem('user'))
      getUser(userInfo)
      setUpdateUser(false);
    }
  }, [updateUser])

  const getUser = async (info) => {
    const userId = info._id;
    await fetch(`/odinbook/users/${userId}`, {
      method: 'get',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
    }).then(res => res.json())
      .then(data => {
        setUser(data.data);
      })
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/odinbook' element={<Home token={token} user={user} updateUser={updateUser} setUpdateUser={setUpdateUser} />} />
          <Route path='/odinbook/login' element={<Login setToken={setToken} setUser={setUser} updateUser={updateUser} setUpdateUser={setUpdateUser} />} />
          <Route path='/odinbook/signup' element={<Signup updateUser={updateUser} setUpdateUser={setUpdateUser} />} />
          <Route path='/odinbook/users/:userId' element={<Profile user={user} setUser={setUser} token={token} updateUser={updateUser} setUpdateUser={setUpdateUser} />} />
          <Route path='/odinbook/users/index' element={<UserIndex token={token} user={user} updateUser={updateUser} setUpdateUser={setUpdateUser} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
