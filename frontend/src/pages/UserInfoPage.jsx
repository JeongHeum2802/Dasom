const API = import.meta.env.VITE_API_BASE;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMyData } from '../store/MyDataContext';


export default function UserInfoPage() {
  const { user, setUser } = useMyData();
  const [image, setImage] = useState(user.main.profileImageUrl || ""); //화면에 보이는 url
  const [name, setName] = useState(user.main.name);
  const [mbti, setMbti] = useState(user.main.MBTI);
  const [newImageOb, setNewImageOb] = useState(null); // 이미지 객체
  const [onSubmit, setOnSubmit] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit() {
    if (image === "") {
      alert("사진을 설정해주세요.!");
      return;
    }
    setOnSubmit(true);
    try {
      
      // 네이버 로그인 시 저장된 naverId 가져오기
      const naverId = user.main.naverId;

      // 이미지 cloudinary에 업로드 후 링크 얻기
      const formData = new FormData();
      formData.append("file", newImageOb);
      formData.append("upload_preset", "dasom_demo");

      const cloudinaryRes = await fetch(
        "https://api.cloudinary.com/v1_1/de0jdvkyy/image/upload",
        { method: "POST", body: formData }
      );

      const cloudinaryData = await cloudinaryRes.json();

      const response = await fetch(`${API}/saveInfo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          naverId,
          name,
          mbti,
          profileImageUrl: cloudinaryData.secure_url,
        }),
      });
      const resData = await response.json();
      alert(resData.message);
      setUser(resData.user);
      navigate('/home');
    } catch (err) {
      console.error(err);
      alert('저장 중 오류가 발생했습니다.');
    }
    setOnSubmit(false);
  }
  

  function handleBack() {
    navigate('/Home');
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      setNewImageOb(file);

      // 미리보기용 url
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  }

  return (
    <>
    {/* 뒤로가기 Button */}
      <div className="fixed left-10 top-10 w-full max-w-lg">
        {/*뒤로가기 버튼*/}
        <button onClick={handleBack} className="absolute top-0 left-0 bg-white p-3 rounded-full hover:bg-gray-100 transition-colors shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
      
      {/*Image Input*/}
      <div className="flex flex-col w-full items-center pt-10 bg-pink-50 min-h-screen">
        {/* profile Image */}
        <div className="relative mb-8 mt-16">
          <img src={image} className="rounded-full w-80 h-80 object-cover border-8 border-pink-200 shadow-lg" />
          {/* image set button */}
          <input id="fileInput" onChange={handleImageChange} type="file" accept="image/*" className="hidden" />
          <label htmlFor="fileInput" className="absolute bottom-2 right-2 bg-pink-500 p-3 rounded-full hover:bg-pink-600 transition-colors shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 1  13.536 3.536L6.5 21.036H3v-3.5L14.732 5.232z" />
            </svg>
          </label>
        </div>

        <div className="w-full max-w-lg space-y-6">
          {/* Name Input */}
          <div className="bg-white rounded-full shadow-lg p-2 flex items-center">
            <span className="px-6 text-gray-500 font-semibold">이름</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-grow py-3 text-xl font-bold text-gray-700 bg-transparent focus:outline-none"
              placeholder="이름을 입력하세요"
            />
          </div>

          {/* MBTI Input */}
          <div className="bg-white rounded-full shadow-lg p-2 flex items-center">
            <span className="px-6 text-gray-500 font-semibold">MBTI</span>
            <input
              type="text"
              value={mbti}
              onChange={(e) => setMbti(e.target.value)}
              className="flex-grow py-3 text-xl font-bold text-gray-700 bg-transparent focus:outline-none"
              placeholder="MBTI를 입력하세요"
            />
          </div>
        </div>

        <div className="w-full max-w-lg mt-10">
          <button
            disable={onSubmit}
            style={{ cursor: 'pointer' }}
            className="w-full bg-pink-500 text-white font-bold py-4 px-6 rounded-full hover:bg-pink-600 transition-colors shadow-lg duration-200"
            onClick={handleSubmit}
          >
            {onSubmit ? "저장중..." : "저장"}
          </button>
        </div>
      </div>
    </>
  );
}
