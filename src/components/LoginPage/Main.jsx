import Header from './Header.jsx';
import Review from './Review.jsx';

export default function Main() {

  return (
<main className="bg-[url('./assets/background.png')] bg-fixed bg-cover bg-no-repeat bg-center w-full min-h-screen">
      <Header />
      <Review />
    </main>
  );
}