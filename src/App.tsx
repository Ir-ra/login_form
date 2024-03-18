import React from 'react';
import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import ForgotPassword_page from './pages/ForgotPassword_page';
import SignIn_page from './pages/SignIn_page';
import Layout from './components/Layout/Layout';
import CreatePassword_page from './pages/CreatePassword_page';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to="/login" replace />} />
        <Route path='/' element={<Layout />}>
          <Route
            path='/login'
            element={<SignIn_page />} />

          <Route
            path='/forgot-password'
            element={<ForgotPassword_page />} />

          <Route
            path='/create-password'
            element={<CreatePassword_page />} />
        </Route>

      </Routes>
    </>
  );
}

export default App;
