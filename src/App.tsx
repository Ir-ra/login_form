import React, { Suspense } from 'react';
import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import ForgotPassword_page from './pages/ForgotPassword_page';
import SignIn_page from './pages/SignIn_page';
import Layout from './components/Layout/Layout';
import Logo from './components/Logo/Logo';

const App: React.FC = () => {
  return (
    <>

      <Routes>
        <Route path='/' element={<Navigate to="/login" replace />} />
        <Route path='/' element={<Layout />}>
          <Route
            path='/login'
            element={
              <Suspense>
                <SignIn_page />
              </Suspense>
            } />

          <Route
            path='/forgot-password'
            element={
              <Suspense>
                <ForgotPassword_page />
              </Suspense>
            } />
        </Route>

      </Routes>
    </>
  );
}

export default App;
