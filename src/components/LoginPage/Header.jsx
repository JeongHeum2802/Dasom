import logo from '../../assets/logo.png';
import { useContext } from 'react';
import { ModalContext } from '../../store/ModalContext.jsx';


export default function Header() {
  const { showLoginModal } = useContext(ModalContext);
  const liStyle = "rounded-xl px-3 flex justify-center items-center h-full text-2xl text-white font-black cursor-default transition-all hover:bg-stone-800/50 duration-300";

  return (
    <header className="pt-3 h-25 flex gap-4 transition">
      <img src={logo} className="w-32 h-24 hover:cursor-pointer" />
      <ul className="flex items-end">
        <li className={liStyle}>서비스</li>
        <li className={liStyle}>소개</li>
        <li className={liStyle}>안전</li>
        <li className={liStyle}>고객지원</li>
        <li className={liStyle}>다운로드</li>
      </ul>
      <button onClick={showLoginModal} className="font-black ml-auto mr-5 mt-5 h-12 w-22 bg-pink-500 text-white rounded-[50px] hover:bg-pink-600 transition-all duration-300">
        로그인
      </button>
    </header>
  );
}