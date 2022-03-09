import { NotFound, PrivateRouter } from 'components/common';
import { Admin } from 'components/layout';
import LoginPage from 'features/auth/pages/loginPage';
import { ChatRoom, Room } from 'features/chat';
import { DashBoard } from 'features/dashboard';
import { Post } from 'features/posts';
import { Student } from 'features/student';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import socket from 'socket';
import './App.css';

function App() { 

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
        {/* <Route path="chat" element={<ChatRoom />} /> */}
        <Route path="chat" element={<ChatRoom />} />
        <Route path="room" element={<Room />} />
        <Route path="post" element={<Post />} />
      </Route>
      <Route element={<NotFound />} />
    </Routes>
  );
}

export default App;
