import { useContext } from 'react';

import { MyDataContext } from '../../store/MyDataContext.jsx';

export default function Chating() {
  const chatings = useContext(MyDataContext).chatings;
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-pink-800 mb-4">채팅 목록</h2>
      {chatings.length > 0 ? (
        <ul>
          {chatings.map((chating) => (
            <li key={chating.id} className="flex items-center justify-between p-3 mb-2 bg-pink-100 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-pink-300 flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-pink-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{chating.name}</p>
                  <p className="text-sm text-gray-600">
                    {chating.chat[0].context}
                  </p>
                </div>
              </div>
              {/* chat button */}
              <button className="bg-pink-300 hover:bg-pink-400 text-pink-800 font-bold py-1 px-3 rounded-full text-sm transition">
                채팅
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">친구를 찾아보세요!</p>
      )}
    </div>
  );
}