import { useState, useEffect } from 'react';

import { MyDataContext } from "../store/MyDataContext.jsx";
import { UserDataContext } from "../store/UserDataContext.jsx";

import SideBar from "../components/HomePage/SideBar.jsx";
import Main from "../components/HomePage/Main.jsx";
import UserPage from "../components/HomePage/UserPage.jsx";

const tempId = "688e36e031a1a25045bb16c7";


export default function HomePage() {
  const [clickedUser, setClickedUser] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [anotherData, setAnotherData] = useState(null);

  // 다른 사용자 정보 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/main/${tempId}`);
        const fetchData = await response.json();
        setAnotherData(fetchData);
      } catch (error) {
        console.error("에러!!: ", error);
      }
    }
    fetchData();
  }, []);


  const contextMyData = {
    id: 1,
    friends: [
      { id: 2, name: '김철수', message: '나랑 메세지할사람?' },
      { id: 3, name: '이영희', message: '심심해 ㅠㅠ' },
      { id: 4, name: '박민수', message: '외롭운 밤이구만..' },
      { id: 5, name: '최지영', message: '나랑 달보러가자' }],
    chatings: [
      {
        id: 3, name: '이영희',
        chat: [
          { provider: 'me', context: '안녕하세요!' },
          { provider: 'you', context: '하이용' },
          { provider: 'me', context: '어디사세여?' },
          { provider: 'you', context: '너의 마음속..' }
        ]
      },
      {
        id: 2, name: '김철수',
        chat: [
          { provider: 'me', context: '뭐여' },
          { provider: 'you', context: '하이용' },
          { provider: 'me', context: '어디사세여?' },
          { provider: 'you', context: '너의 마음속..' }
        ]
      }
    ]
  };


  // const contextUserData = [
  //   { id: 2, name: '김철수', imgsrc: '../../../public/userImg/user_2.png', message: '안녕하세요!' },
  //   { id: 3, name: '이영희', imgsrc: '../../../public/userImg/user_3.png', message: '오늘 날씨 좋네요.' },
  //   { id: 4, name: '박민수', imgsrc: '../../../public/userImg/user_4.png', message: '점심 뭐 먹을까요?' },
  //   { id: 5, name: '최지영', imgsrc: '../../../public/userImg/user_5.png', message: '주말에 뭐 하세요?' },
  //   { id: 6, name: '구준표', imgsrc: '../../../public/userImg/user_6.png', message: '저는 지금 회의 중입니다.' },
  //   { id: 7, name: '김두기', imgsrc: '../../../public/userImg/user_7.png', message: '오늘 저녁에 약속 있으세요?' },
  //   { id: 8, name: '박보영', imgsrc: '../../../public/userImg/user_8.png', message: '다음에 한번 만나요.' },
  //   { id: 9, name: '이민준', imgsrc: '../../../public/userImg/user_9.png', message: '오늘 하루도 힘내세요!' },
  //   { id: 10, name: '박서연', imgsrc: '../../../public/userImg/user_10.png', message: '좋은 하루 보내세요.' },
  //   { id: 11, name: '최지훈', imgsrc: '../../../public/userImg/user_11.png', message: '다음에 또 봐요.' },
  //   { id: 12, name: '김민지', imgsrc: '../../../public/userImg/user_12.png', message: '잘 지내시죠?' },
  //   { id: 13, name: '정현우', imgsrc: '../../../public/userImg/user_13.png', message: '오랜만이에요.' },
  //   { id: 14, name: '윤채원', imgsrc: '../../../public/userImg/user_14.png', message: '다음에 커피 한잔 해요.' },
  //   { id: 15, name: '강도윤', imgsrc: '../../../public/userImg/user_15.png', message: '오늘 정말 덥네요.' },
  //   { id: 16, name: '신하은', imgsrc: '../../../public/userImg/user_16.png', message: '비가 올 것 같아요.' },
  //   { id: 17, name: '조승민', imgsrc: '../../../public/userImg/user_17.png', message: '오늘 하루 어땠어요?' },
  //   { id: 18, name: '안유진', imgsrc: '../../../public/userImg/user_18.png', message: '저는 오늘 좀 피곤하네요.' },
  //   { id: 19, name: '오준서', imgsrc: '../../../public/userImg/user_19.png', message: '주말에 푹 쉬세요.' },
  //   { id: 20, name: '황지아', imgsrc: '../../../public/userImg/user_20.png', message: '다음에 또 연락드릴게요.' },
  //   { id: 21, name: '장선우', imgsrc: '../../../public/userImg/user_21.png', message: '오늘 하루도 수고하셨습니다.' },
  //   { id: 22, name: '임예은', imgsrc: '../../../public/userImg/user_22.png', message: '좋은 꿈 꾸세요.' },
  //   { id: 23, name: '서동현', imgsrc: '../../../public/userImg/user_23.png', message: '내일 뵙겠습니다.' },
  //   { id: 24, name: '송지우', imgsrc: '../../../public/userImg/user_24.png', message: '오늘 정말 즐거웠어요.' },
  //   { id: 25, name: '권민서', imgsrc: '../../../public/userImg/user_25.png', message: '다음에 또 만나요.' },
  //   { id: 26, name: '홍다인', imgsrc: '../../../public/userImg/user_26.png', message: '오늘 하루도 화이팅!' },
  //   { id: 27, name: '류지호', imgsrc: '../../../public/userImg/user_27.png', message: '오늘 하루도 행복하세요.' },
  //   { id: 28, name: '문서아', imgsrc: '../../../public/userImg/user_28.png', message: '오늘 하루도 즐겁게 보내세요.' },
  //   { id: 29, name: '백건우', imgsrc: '../../../public/userImg/user_29.png', message: '오늘 하루도 좋은 일만 가득하세요.' },
  //   { id: 30, name: '허나윤', imgsrc: '../../../public/userImg/user_30.png', message: '오늘 하루도 행복한 하루 보내세요.' }
  // ];


  function handleClickUser(clickedId, scrollPos = 0) {
    if (clickedId === -1) {
      setClickedUser(null);
    } else {
      setScrollPosition(scrollPos);
      setClickedUser(contextUserData.filter((obj) => obj.id === clickedId)[0]);

    }
  }

  return (
    <MyDataContext value={contextMyData}>
      <div className="flex h-screen overflow-hidden ">
        <SideBar />
        {clickedUser === null ?
          (<UserDataContext value={anotherData}>
            <Main onUserClick={handleClickUser} scrollPosition={scrollPosition} />
          </UserDataContext>) :
          (<UserPage userData={clickedUser} onCloseUserPage={handleClickUser} />)
        }
      </div>
    </MyDataContext >
  );
}