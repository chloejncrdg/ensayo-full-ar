import './App.css';
import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages
import Dashboard from './pages/Dashboard'
import Home from './pages/Home';
import Lessons from './pages/Lessons'
import Login from './pages/Login'
import Modules from './pages/Modules'
import Practicals from './pages/Practicals'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Tools from './pages/Tools'
import Units from './pages/Units'

// components
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/modules/:courseId" element={<Modules/>} />
          <Route path="/units/:courseId/:moduleId" element={<Units/>} />
          <Route path="/lessons/:courseId/:moduleId/:unitId" element={<Lessons/>} />
          <Route path="/tools/:courseId/:moduleId/:unitId/:toolGroupId" element={<Tools/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
