import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useMyData } from '../store/MyDataContext';

const api = axios.create({
  baseURL: 'https://localhost:3000',
});



export default function UserInfoPage() {
  const { user, setUser } = useMyData();
  const [name, setName] = useState('김첨지');
  const [mbti, setMbti] = useState('INFP');
  const navigate = useNavigate();

  async function handleSave() {
    try {
      // 네이버 로그인 시 저장된 naverId 가져오기
      const naverId = user.main.naverId;

      const response = await axios.post('/api/saveInfo', {
        naverId,
        name,
        mbti
      });
      alert(response.data.message);
      setUser((prevUserData) => {
        const newData = {
          ...prevUserData,
          initUser: false,
        }
      })
      navigate('/home');
    } catch (err) {
      console.error(err);
      alert('저장 중 오류가 발생했습니다.');
    }
  }

  return (
    <>
      <div className="fixed left-10 top-10 w-full max-w-lg">
        <button className="absolute top-0 left-0 bg-white p-3 rounded-full hover:bg-gray-100 transition-colors shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col w-full items-center pt-10 bg-pink-50 min-h-screen">
        <div className="relative mb-8 mt-16">
          <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTwvOCtju1bCNx_OX8EupPez6qMjmkLRB6pGPzufiJ_dxk1DfhDnPNV1DHlp3GWJ4hsQ4P6XKYNnmoHzVSeO3GYRmbJvtOICIPhzX2bGflNQ"} className="rounded-full w-80 h-80 object-cover border-8 border-pink-200 shadow-lg" />
          <button className="absolute bottom-2 right-2 bg-pink-500 p-3 rounded-full hover:bg-pink-600 transition-colors shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 5.232z" />
            </svg>
          </button>
        </div>

        <div className="w-full max-w-lg space-y-6">
          {/* Name Input */}
          <div className="bg-white rounded-full shadow-lg p-2 flex items-center">
            <span className="px-6 text-gray-500 font-semibold">이름</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-grow py-3 text-xl font-bold text-gray-700 bg-transparent focus:outline-none"
              placeholder="이름을 입력하세요"
            />
          </div>

          {/* MBTI Input */}
          <div className="bg-white rounded-full shadow-lg p-2 flex items-center">
            <span className="px-6 text-gray-500 font-semibold">MBTI</span>
            <input
              type="text"
              value={mbti}
              onChange={(e) => setMbti(e.target.value)}
              className="flex-grow py-3 text-xl font-bold text-gray-700 bg-transparent focus:outline-none"
              placeholder="MBTI를 입력하세요"
            />
          </div>
        </div>

        <div className="w-full max-w-lg mt-10">
          <button
            style={{ cursor: 'pointer' }}
            className="w-full bg-pink-500 text-white font-bold py-4 px-6 rounded-full hover:bg-pink-600 transition-colors shadow-lg duration-200"
            onClick={handleSave}
          >
            저장
          </button>
        </div>
      </div>
    </>
  );
}
