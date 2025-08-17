import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { AnotherUsersContext } from "../store/AnotherUsersContext.jsx";

import SideBar from "../components/HomePage/SideBar.jsx";
import Main from "../components/HomePage/Main.jsx";
import UserPage from "../components/HomePage/UserPage.jsx";

export default function HomePage() {
  const loginData = useLocation().state?.user; // 불러온 User데이터
  const [clickedUser, setClickedUser] = useState(null); // Main에서 클릭된 유저
  const [scrollPosition, setScrollPosition] = useState(0); // Scroll 위치
  const [anotherData, setAnotherData] = useState(null); // 본인제외 모든사람
  const [myData, setMyData] = useState(null); // 본인 데이터
  const [isLoding, setIsLoding] = useState(false); // 데이터 로딩 중
  const [friends, setFriends] = useState([]);

  // 다른 사용자 정보 불러오기 및 user정보 설정
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 본인 제외 다른 사용자 정보
        const responseAnother = await fetch(`/api/main/${loginData.main.naverId}`);
        const fetchAnotherData = await responseAnother.json();
        setAnotherData(fetchAnotherData);

        // 본인 정보 설정
        setMyData(loginData);

        // 친구들 정보 필터링
        setFriends(fetchAnotherData.filter(user => loginData.others.friends.includes(user.main.naverId)));
      } catch (error) {
        console.error("에러!!: ", error);
      } finally {
        setIsLoding(true);
      }
    }
    fetchData();
  }, []);

  // Main의 유저 클릭시 스크롤 저장 및 필터링
  function handleClickUser(clickedId, scrollPos = 0) {
    if (clickedId === -1) {
      setClickedUser(null);
    } else {
      setScrollPosition(scrollPos);
      setClickedUser(anotherData.filter((obj) => obj.main.naverId === clickedId)[0]);
    }
  }

  // 데이터 로딩 안됐을 때
  if (!isLoding) {
    return <p>데이터 불러오는중...</p>;
  }

  return (
      <div className="flex h-screen overflow-hidden ">
        <SideBar friends={friends} myData={myData} />
        {clickedUser === null ?
          (<AnotherUsersContext value={anotherData}>
            <Main onUserClick={handleClickUser} scrollPosition={scrollPosition} />
          </AnotherUsersContext>) :
          (<UserPage userData={clickedUser} onCloseUserPage={handleClickUser} />)
        }
      </div>
  );
}