import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { MyDataProvider } from './store/MyDataContext.jsx';

import LoginPage from './pages/LoginPage.jsx';
import HomePage from './pages/HomePage.jsx';
import UserInfoPage from './pages/UserInfoPage.jsx';
import ChatPage from './pages/ChatPage.jsx';

export default function App() {
  return (
    <MyDataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />}></Route>
            <Route path="/Home" element={<HomePage />}></Route>
            <Route path="/MyInfo" element={<UserInfoPage />}></Route>
            <Route path="/Chat" element={<ChatPage />}></Route>
          </Routes>
        </BrowserRouter>
    </MyDataProvider>
  );
}