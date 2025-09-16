import { useState } from 'react';

// context
import { useMyData } from '../store/MyDataContext.jsx';
import { AnotherUsersDataProvider } from '../store/AnotherUsersContext.jsx';

// component
import SideBar from "../components/HomePage/SideBar.jsx";
import Main from "../components/HomePage/Main.jsx";
import UserPage from "../components/HomePage/UserPage.jsx";
import ChatPage from '../components/HomePage/ChatPage.jsx';

export default function HomePage() {
  const [rightPage, setRightPage] = useState("Main");
  const [clickedUser, setClickedUser] = useState(null); // Main에서 클릭된 유저
  const [clickedFriend, setClickedFriend] = useState(null); // SideBar에서 클린되 유저
  const [scrollPosition, setScrollPosition] = useState(0); // Scroll 위치

  // context 사용
  const { user } = useMyData(); // 내 정보

  // Main의 유저 클릭시 스크롤 저장 및 필터링
  function handleClickUser(clickedUser, scrollPos = 0) {
    if (clickedUser === -1) {
      setClickedUser(null);
      setRightPage("Main");
    } else {
      setScrollPosition(scrollPos);
      setClickedUser(clickedUser);
      setRightPage("User");
    }
  }

  function handleClickFriend(clickedFriendId) {
    setRightPage("Chat");
    setClickedFriend(clickedFriendId);
  }

  return (
    <AnotherUsersDataProvider>
      <div className="flex h-screen overflow-hidden ">
        <SideBar myData={user} onClickFriend={handleClickFriend} />
        {rightPage === "Main" && <Main onUserClick={handleClickUser} scrollPosition={scrollPosition} />}
        {rightPage === "User" && <UserPage  userData={clickedUser} onCloseUserPage={handleClickUser} />}
        {rightPage === "Chat" && <ChatPage myId={user.main.naverId} youId={clickedFriend} />}
      </div>
    </AnotherUsersDataProvider>
  );
}