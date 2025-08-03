import Main from '../components/LoginPage/Main.jsx';
import Footer from '../components/LoginPage/Footer.jsx';
import LoginModal from '../components/LoginPage/LoginModal.jsx';
import ModalContextProvider from '../store/ModalContext.jsx';


export default function LoginPage() {

  return (
    <ModalContextProvider>
      <LoginModal />
      <Main />
      <Footer />
    </ModalContextProvider>
  );
}