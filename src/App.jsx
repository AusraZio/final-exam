import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Register from './components/Register';
import { Routes, Route } from 'react-router-dom';
import Footer from "./components/Footer";
import SignIn from './components/SignIn';
import React, { useState } from 'react';
import NewPostForm from './components/NewPostForm';
import UserPage from './components/UserPage';
import UsersPage from './components/UsersPage';
import EditPostForm from './components/EditPostForm';





const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (name, password) => {
    if (name === "test" && password === "password123") {
      setIsLoggedIn(true);
    }
  };

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/user" element={<UserPage />} /> 
          <Route path="/users" element={<UsersPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/newPost" element={<NewPostForm />} />
          <Route path="/editPost/:id" element={<EditPostForm />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;