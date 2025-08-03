import { createContext, useState, useEffect } from 'react';

export const ModalContext = createContext({
  isModalOpen: false,
  showLoginModal: () => {},
  closeLoginModal: () => {},
});

export default function ModalContextProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isModalOpen]);

  function showLoginModal() {
    setIsModalOpen(true);
  }

  function closeLoginModal() {
    setIsModalOpen(false);
  }

  const modalCtx = {
    isModalOpen,
    showLoginModal,
    closeLoginModal,
  };

  return (
    <ModalContext.Provider value={modalCtx}>{children}</ModalContext.Provider>
  );
}
