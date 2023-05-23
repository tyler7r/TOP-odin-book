import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Home } from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
        <Route path='/odinbook' element={<Home />} />
          <Route path='/odinbook/login' element={<Login />} />
          <Route path='/odinbook/signup' element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
