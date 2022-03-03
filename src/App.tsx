import { NotFound, PrivateRouter } from 'components/common';
import { Admin } from 'components/layout';
import LoginPage from 'features/auth/pages/loginPage';
import { DashBoard } from 'features/dashboard';
import { Student } from 'features/student';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import socket from 'socket';
import './App.css';

function App() {
  React.useEffect(() => {
    socket.emit('hello')
  }, [])
  return (
    <Routes>
      <Route path="/login"  element={<LoginPage />} />
      <Route
        path="admin"
        element={
          <PrivateRouter>
            <Admin />
          </PrivateRouter>
        }
      >
        <Route index element={<DashBoard />} />
        <Route path="student" element={<Student />} />
      </Route>
      <Route element={<NotFound />} />
    </Routes>
  );
}

export default App;
