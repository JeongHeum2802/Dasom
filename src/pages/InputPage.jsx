import { useState } from 'react';



function InputPage() {

  const gender = [
    "-선택-",
    "남성",
    "여성",
    "논바이너리",
    "비공개"
  ];

  const city = [
    "-선택-",
    "서울",
    "인천",
    "경기도",
    "부산",
    "대구",
    "광주",
    "대전",
    "울산",
    "세종",
    "강원도",
    "충청북도",
    "충청남도",
    "전라북도",
    "전라남도",
    "경상북도",
    "경상남도",
    "제주도"
  ]

  const [selectgender, setselectgender] = useState(gender[0]);
  const [selectcity, setselectcity] = useState(city[0]);

  return (
    <div className="App">
      {
        // 이름 입력 받기
      }
      <form>
      <h3 id="writing_introduce">이름</h3>
      <input
        id="writing"
        type="text"
        name="Name"
        placeholder='이름을 입력하세요'
        maxLength={10}
        >
        </input>

      {
        // MBTI 입력 받기
      }

      <h3 id="writing_introduce">MBTI</h3>
      <input
        id="writing"
        type="text"
        name="Name"
        placeholder='MBTI을 입력하세요'
        maxLength={4}
        >
        </input>

      {
        // 성별 입력 받기
      }

        <h3 id="writing_introduce">성별</h3>     

        <select id = "select_input"
        onChange={(e) => setselectgender(e.target.value)}>
          {gender.map((gender)=>(              // 이거 gender 배열을 나누는 과정 (중요)
          <option selected = {gender == selectgender}         /* 선택한 gender을 state에 넣는 과정 */ >
              {gender}
            </option>))}
        </select>
        <div>선택한 성별 : {selectgender}</div>
        
        <h3>거주지</h3>
        <select id = "select_input"
        onChange={(e) => setselectcity(e.target.value)}>
          {city.map((city)=>(              // 이거 gender 배열을 나누는 과정 (중요)
          <option selected = {city == selectcity}        /* 선택한 gender을 state에 넣는 과정 */ >
              {city}
            </option>))}
        </select>
        <div>선택한 도시 : {selectcity}</div>
        <br/><br/>
        <button type="submit"> 정보 저장 </button>

    </form>
    </div>
  );
}


export default InputPage;