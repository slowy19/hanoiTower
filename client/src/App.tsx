import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Main } from './pages/main';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
  <>
    <ToastContainer />
    <Routes>
      <Route path={"/"} element={<Main />}></Route>
    </Routes>
  </>
  );
}

export default App;
