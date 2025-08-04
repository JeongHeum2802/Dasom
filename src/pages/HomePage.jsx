import { useState, useEffect } from 'react';

import { UserDataContext } from "../store/UserDataContext.jsx";

import SideBar from "../components/HomePage/SideBar.jsx";
import Main from "../components/HomePage/Main.jsx";
import UserPage from "../components/HomePage/UserPage.jsx";

const tempId = "dummy3";

export default function HomePage() {
  const [clickedUser, setClickedUser] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [anotherData, setAnotherData] = useState(null);
  const [myData, setMyData] = useState(null);
  const [friendsList, setFriendsList] = useState([]);

  // 다른 사용자 정보 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseAnother = await fetch(`/api/main/${tempId}`);
        const fetchAnotherData = await responseAnother.json();
        setAnotherData(fetchAnotherData);

        const friendsId = ["fkQ-WFD3JhOYWkQqngv3nEaq6fM4K-r-LFIaxVZm4SY", "dummy_1"];
        setFriendsList(fetchAnotherData.filter((data) => friendsId.includes(data.main.naverId)));
      } catch (error) {
        console.error("에러!!: ", error);
      } finally {
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

  return (
      <div className="flex h-screen overflow-hidden ">
        <SideBar friends={friendsList} />
        {clickedUser === null ?
          (<UserDataContext value={anotherData}>
            <Main onUserClick={handleClickUser} scrollPosition={scrollPosition} />
          </UserDataContext>) :
          (<UserPage userData={clickedUser} onCloseUserPage={handleClickUser} />)
        }
      </div>
  );
}