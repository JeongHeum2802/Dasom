import { useState } from 'react';

// context
import { useMyData } from '../store/MyDataContext.jsx';
import { useUsersData } from '../store/AnotherUsersContext.jsx';
import { AnotherUsersDataProvider } from '../store/AnotherUsersContext.jsx';

// component
import SideBar from "../components/HomePage/SideBar.jsx";
import Main from "../components/HomePage/Main.jsx";
import UserPage from "../components/HomePage/UserPage.jsx";

export default function HomePage() {
  const [clickedUser, setClickedUser] = useState(null); // Main에서 클릭된 유저
  const [scrollPosition, setScrollPosition] = useState(0); // Scroll 위치

  // context 사용
  const { user } = useMyData(); // 내 정보


  // Main의 유저 클릭시 스크롤 저장 및 필터링
  function handleClickUser(clickedUser, scrollPos = 0) {
    if (clickedUser === -1) {
      setClickedUser(null);
    } else {
      setScrollPosition(scrollPos);
      setClickedUser(clickedUser);
    }
  }

  return (
    <AnotherUsersDataProvider>
      <div className="flex h-screen overflow-hidden ">
        <SideBar myData={user} />
        {clickedUser === null ?
          (<Main onUserClick={handleClickUser} scrollPosition={scrollPosition} />) :
          (<UserPage userData={clickedUser} onCloseUserPage={handleClickUser} />)}
      </div>
    </AnotherUsersDataProvider>
  );
}