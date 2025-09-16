import { useNavigate } from "react-router-dom";

import {useUsersData} from '../../store/AnotherUsersContext.jsx'

import FriendsList from './FriendsList.jsx';

export default function SideBar({ myData, onClickFriend }) {
  const navigate = useNavigate();
  const { friends, isLoding } = useUsersData();

  const handleClickUserProfile = () => {
    navigate('/MyInfo');
  }

  // 유저 목록 불러올때까지 대기
  if (!isLoding) {
    return <p>loding....</p>
  }

  return (
    // Main background: light pink for light mode, dark gray for dark mode
    <aside className="flex flex-col w-80 h-screen  bg-pink-50 flex-shrink-0 border-r-2 border-pink-200">
      {/* Top section */}
      <div className="p-4 border-b-2 border-pink-300 bg-pink-100">
        <div className="flex items-center">
          {/* UserProfile */}
          <div 
          onClick={handleClickUserProfile}
          className="w-12 h-12 rounded-full bg-pink-300 flex items-center justify-center mr-3 overflow-hidden border-2 border-pink-200 shadow-lg"
          >
            {myData.main.profileImageUrl !== "" ? (
            <img src={myData.main.profileImageUrl} className="w-full h-full object-cover" />) : (
            <svg className="w-10 h-10 text-pink-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>)}
          </div>
          <div className="ml-2">
            {/* UserName */}
            <p className="font-semibold text-gray-800">{myData.main.name}</p>
            {/* UserMBTI */}
            <p className="text-sm text-gray-600">{myData.main.MBTI}</p>
          </div>
          {/* bell */}
          <div className="ml-30">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
        </div>
        {/* Upgrade button */}
        <button className="w-full mt-4 flex items-center justify-center py-2 px-4 text-sm font-medium text-pink-800 focus:outline-none bg-pink-200 rounded-lg border-pink-300 border-1 hover:bg-pink-300 hover:text-pink-900 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Upgrade
        </button>
      </div>

      {/* Main content area */}
      <div className="h-full overflow-y-auto">
        <FriendsList friends={friends} onClickChatButton={onClickFriend} />
      </div>

      {/* Footer */}
      <div className="flex justify-center items-center p-4 border-t-1 border-pink-300 bg-pink-100">
        <button className="flex-grow flex items-center justify-center py-2 px-4 text-sm font-medium text-pink-800 focus:outline-none bg-pink-200 rounded-lg border-pink-300 border-1 hover:bg-pink-300 hover:text-pink-900 transition">
          로그아웃
        </button>
        <button className="ml-2 flex items-center justify-center p-2 text-sm font-medium text-pink-800 focus:outline-none bg-pink-200 rounded-lg border-pink-300 border-1 hover:bg-pink-300 hover:text-pink-900 transition">
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
    </aside>
  );
}
