import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Register from './components/Register';
import SignIn from "./components/SignIn";
import { Routes, Route } from 'react-router-dom';
import Footer from "./components/Footer";
import LogIn from './components/SignIn';
import React, { useState } from 'react';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (email, password) => {
    if (email === "test@example.com" && password === "password123") {
      setIsLoggedIn(true);
    }
  };

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LogIn handleLogin={handleLogin} />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;