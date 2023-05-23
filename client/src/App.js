import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Home } from './components/Home';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenSet = JSON.parse(localStorage.getItem('token'))
    const userSet = JSON.parse(localStorage.getItem('user'))

    if (tokenSet) {
      setToken(`Bearer ${tokenSet}`)
    }
    if (userSet) {
      setUser(userSet)
    }
  },[])

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/odinbook' element={<Home token={token} user={user} />} />
          <Route path='/odinbook/login' element={<Login setToken={setToken} setUser={setUser} />} />
          <Route path='/odinbook/signup' element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
