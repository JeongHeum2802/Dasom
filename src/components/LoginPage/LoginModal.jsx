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

  return (
    <dialog ref={dialog} className="m-auto rounded-2xl" onClose={closeLoginModal}>
      <div className="flex flex-col m-4 justify-center items-center w-[420px] h-[600px] rounded-2xl">
        <img src={logo} className="w-50 h-50 mb-3" />

        <form method="dialog" className="flex flex-col">
        <Link to="/Home">
          <button
            className="mt-12">
            <img src={loginbarImg} className="w-[350px]"
              onMouseEnter={() => setLoginbarImg(naverLoginHover)}
              onMouseLeave={() => setLoginbarImg(naverLogin)}
            />
          </button>
          </Link>
        </form>
      </div>
    </dialog>
  );
}