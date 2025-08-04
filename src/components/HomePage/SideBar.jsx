import { useState, useRef, useEffect } from 'react';

import FriendsList from './FriendsList.jsx';
import Chating from './chatings.jsx';

export default function SideBar({ friends, myData }) {
  const [activeTab, setActiveTab] = useState('친구');
  const friendBtnRef = useRef(null);
  const chatBtnRef = useRef(null);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    if (activeTab === '친구' && friendBtnRef.current) {
      setUnderlineStyle({
        left: friendBtnRef.current.offsetLeft,
        width: friendBtnRef.current.offsetWidth,
      });
    } else if (activeTab === '채팅' && chatBtnRef.current) {
      setUnderlineStyle({
        left: chatBtnRef.current.offsetLeft,
        width: chatBtnRef.current.offsetWidth,
      });
    }
  }, [activeTab]);

  return (
    // Main background: light pink for light mode, dark gray for dark mode
    <aside className="flex flex-col w-80 h-screen  bg-pink-50 flex-shrink-0 border-r-2 border-pink-200">
      {/* Top section */}
      <div className="p-4 border-b-2 border-pink-300 bg-pink-100">
        <div className="flex items-center">
          {/* UserProfile */}
          <div className="w-12 h-12 rounded-full bg-pink-300 flex items-center justify-center mr-3">
            {myData.main.profileImageUrl !== "" ? (
            <img src={myData.main.profileImageUrl} />) : (
            <svg className="w-10 h-10 text-pink-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>)}
          </div>
          <div className="ml-2">
            {/* UserName */}
            <p className="font-semibold text-gray-800">{myData.main.name}</p>
            {/* UserEmail */}
            <p className="text-sm text-gray-600">user@example.com</p>
          </div>
          {/* bell */}
          <div className="ml-14">
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
        <div className="relative flex pt-4 pl-4 gap-6 text-lg font-semibold">
          <button
            ref={friendBtnRef}
            className={`${activeTab === '친구' ? 'text-pink-700' : 'text-gray-500 hover:text-pink-700'} pb-2`}
            onClick={() => setActiveTab('친구')}
          >
            친구
          </button>
          <button
            ref={chatBtnRef}
            className={`${activeTab === '채팅' ? 'text-pink-700' : 'text-gray-500 hover:text-pink-700'} pb-2`}
            onClick={() => setActiveTab('채팅')}
          >
            채팅
          </button>
          <div
            className="absolute bottom-0 h-0.5 bg-pink-700 transition-all duration-300 ease-in-out"
            style={{ left: underlineStyle.left, width: underlineStyle.width }}
          ></div>
        </div>

        {/*activeTab === '친구' ? <FriendsList friends={friends} /> : <Chating />*/}
        <FriendsList friends={friends} />
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
