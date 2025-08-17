import { useContext, useRef, useEffect } from 'react';

import { useUsersData } from '../../store/AnotherUsersContext.jsx';
import { useAutoAnimate } from '@formkit/auto-animate/react';

export default function Main({ onUserClick, scrollPosition }) {
  const { users:usersData } = useUsersData();
  const [animationParent] = useAutoAnimate();

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollPosition;
    }
  }, [scrollPosition]);

  if (usersData === null) {
    return <div>NoUser</div>;
  }

  return (
    <div ref={scrollContainerRef} className="flex-1 overflow-y-auto bg-gray-100">
      <div className="p-8 flex flex-wrap gap-6 justify-center" ref={animationParent}>
        {usersData.map((user) => {
          user = user.main;
          return (
            /* userCard */
            <div
              onClick={() => onUserClick(user, scrollContainerRef.current.scrollTop)}
              key={user.naverId}
              className="w-64 h-80 bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-in-out flex-shrink-0"
            >
              <img src={user.profileImageUrl} alt={user.name} className="w-full h-56 object-cover" />
              <div className="p-4 text-center">
                <p className="font-semibold text-lg text-gray-800">{user.name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}