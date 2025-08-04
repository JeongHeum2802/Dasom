import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { UserDataContext } from "../store/UserDataContext.jsx";

import SideBar from "../components/HomePage/SideBar.jsx";
import Main from "../components/HomePage/Main.jsx";
import UserPage from "../components/HomePage/UserPage.jsx";

const tempId = "dummy3";

export default function HomePage() {
  const location = useLocation();
  const [clickedUser, setClickedUser] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [anotherData, setAnotherData] = useState(null);
  const [myData, setMyData] = useState(null);
  const [isLoding, setIsLoding] = useState(false);

  // 다른 사용자 정보 불러오기 및 user정보 설정
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 본인 제외 다른 사용자 정보
        const responseAnother = await fetch(`/api/main/${tempId}`);
        const fetchAnotherData = await responseAnother.json();
        setAnotherData(fetchAnotherData);

        // 본인 정보 설정
        setMyData(location.state?.user);
      } catch (error) {
        console.error("에러!!: ", error);
      } finally {
        setIsLoding(true);
      }
    }
    fetchData();
  }, []);

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
        <SideBar friends={myData.others.friends} />
        {clickedUser === null ?
          (<UserDataContext value={anotherData}>
            <Main onUserClick={handleClickUser} scrollPosition={scrollPosition} />
          </UserDataContext>) :
          (<UserPage userData={clickedUser} onCloseUserPage={handleClickUser} />)
        }
      </div>
  );
}