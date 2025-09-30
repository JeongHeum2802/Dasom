

export default function FriendsList({ friends, onClickChatButton }) {

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-pink-800 mb-4">친구 목록</h2>
      {friends.length > 0 ? (
        <ul>
          {friends.map((friend) => {
            friend = friend.main;
            return (
              <li key={friend.naverId} className="flex items-center justify-between p-3 mb-2 bg-pink-100 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <img src={friend.profileImageUrl} alt="null" className="w-10 overflow-hidden rounded-full" />
                  <div className="ml-2">
                    <p className="font-semibold text-gray-800">{friend.name}</p>
                    <p className="text-sm text-gray-600">
                      {/*friend.message*/}
                    </p>
                  </div>
                </div>
                {/* chat button */}
                <button onClick={() => onClickChatButton(friend)} className="bg-pink-300 hover:bg-pink-400 text-pink-800 font-bold py-1 px-3 rounded-full text-sm transition">
                  채팅
                </button>
              </li>);
          })}
        </ul>
      ) : (
        <p className="text-gray-600">친구를 찾아보세요!</p>
      )}
    </div>
  );
}