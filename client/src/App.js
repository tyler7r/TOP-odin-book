import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Home } from './components/Home';
import { Profile } from './components/Profile';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenSet = JSON.parse(localStorage.getItem('token'))
    const userInfo = JSON.parse(localStorage.getItem('user'))
    // const userSet = async () => {
    //   console.log('run')
    //   await fetch(`/odinbook/info/${userInfo._id}`, {
    //     method: 'get',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     }
    //   }).then(res => res.json())
    //     .then(data => {
    //       setUser(data.user);
    //     })
    // }

    if (tokenSet) {
      setToken(`Bearer ${tokenSet}`)
    }
    if (userInfo) {
      setUser(userInfo);
    }
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/odinbook' element={<Home token={token} user={user} />} />
          <Route path='/odinbook/login' element={<Login setToken={setToken} setUser={setUser} />} />
          <Route path='/odinbook/signup' element={<Signup />} />
          <Route path='/odinbook/users/:userId' element={<Profile user={user} token={token} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
