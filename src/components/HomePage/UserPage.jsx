import { useMyData } from "../../store/MyDataContext";
import { useState } from 'react';


export default function UserPage({ userData, onCloseUserPage, onClickChat }) {
  const { user, setUser } = useMyData();

  async function handleAddFriend() {
    try {
      const bodyData = {
        friendNaverId: userData.naverId,
        myNaverId: user.main.naverId,
      }

      const res = await fetch(
        "api/plusFriend",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        });
      const resData = await res.json();

      if (resData.state == "fail") {
        alert(resData.message);
        return;
      }
      if (resData.state == "success") {
        alert(resData.message);
        setUser(prev => {
          const prevFriends = prev?.others?.friends ?? [];
          const nextFriends = prevFriends.includes(targetId)
            ? prevFriends // 이미 있으면 굳이 새 배열 만들지 않음(실제 변화 없음)
            : [...prevFriends, targetId]; // 새 배열

          return {
            ...prev,                         // 새 user 객체
            others: {
              ...prev.others,                // 새 others 객체
              friends: nextFriends,          // 새 friends 배열
            },
          };
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleChatButton() {
    onClickChat(userData);
  }

  return (
    <div className="h-full flex-1 flex flex-col bg-pink-100 text-gray-800 relative">
      <button onClick={onCloseUserPage} className="absolute top-6 right-6 text-gray-500 hover:text-gray-800 text-4xl font-bold">&times;</button>
      <div className="flex-10/11 flex flex-col items-center justify-center p-12">
        <img
          src={userData.profileImageUrl}
          alt={`Profile of ${userData.name}`}
          className="w-90 h-90 rounded-full border-8 border-pink-200 shadow-lg mb-12"
        />
        <h1 className="text-5xl font-bold mb-4 text-pink-500">{userData.name}</h1>
        <p className="text-2xl text-center max-w-2xl mt-6 text-gray-700">{userData.message}</p>
      </div>
      <div className="flex-1/11 bg-pink-200 p-6 flex justify-around">
        <button onClick={handleAddFriend} className="bg-pink-400 hover:bg-pink-500 text-white font-bold py-3 px-8 rounded-full transition duration-300">
          친구 추가
        </button>
        <button onClick={handleChatButton} className="bg-pink-400 hover:bg-pink-500 text-white font-bold py-3 px-8 rounded-full transition duration-300">
          메시지 보내기
        </button>
      </div>
    </div>
  );
}