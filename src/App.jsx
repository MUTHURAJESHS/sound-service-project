import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import SignUp from './component/Signup';
import FunctionPage from './component/FunctionPage';
import Login from './component/login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/functions/:functionType" element={<FunctionPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;