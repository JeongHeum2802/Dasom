import logo from '../../assets/logo.png';
import naverLogin from '../../assets/NaverLoginbar.png';
import naverLoginHover from '../../assets/naverLoginbar_hover.png';
import { useEffect, useRef, useContext, useState } from 'react';
import { ModalContext } from '../../store/ModalContext.jsx';
import { Link } from "react-router-dom";

export default function LoginModal() {
  const { isModalOpen, closeLoginModal } = useContext(ModalContext);
  const dialog = useRef();

  const [loginbarImg, setLoginbarImg] = useState(naverLogin);

  useEffect(() => {
    if (isModalOpen) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [isModalOpen]);

  async function handleClickLoginButton() {
    const response = await fetch('/api/naverLogin');
    const loginUrl = await response.json();

    const re = window.open(loginUrl.login_url, "naverLogin", "width=400px,height=600px");
  }

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === 'login-success') {
        const user = event.data.payload;
        console.log("로그인 성공", user);
      }
    }

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    }
  });

  return (
    <dialog ref={dialog} className="m-auto rounded-2xl" onClose={closeLoginModal}>
      <div className="flex flex-col m-4 justify-center items-center w-[420px] h-[600px] rounded-2xl">
        <img src={logo} className="w-50 h-50 mb-3" />

        <form method="dialog" className="flex flex-col">
          <button
            className="mt-12"
            onClick={handleClickLoginButton}
          >
            <img src={loginbarImg} className="w-[350px]"
              onMouseEnter={() => setLoginbarImg(naverLoginHover)}
              onMouseLeave={() => setLoginbarImg(naverLogin)}
            />
          </button>
        </form>
      </div>
    </dialog>
  );
}