import { createContext, useState, useContext, useEffect } from 'react';
import { useMyData } from './MyDataContext';

export const AnotherUsersContext = createContext(null);

export const AnotherUsersDataProvider = ({ children }) => {
  const { user:myData } = useMyData(); 
  const [users, setUsers] = useState(null);
  const [friends, setFriends] = useState(null);
  const [isLoding, setIsLoding] = useState(false);

  // 다른 사용자 정보 불러오기 및 user정보 설정
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 본인 제외 다른 사용자 정보
        const responseAnother = await fetch(`/api/main/${myData.main.naverId}`);
        const fetchAnotherData = await responseAnother.json();
        setUsers(fetchAnotherData);

        // 친구들 정보 필터링
        setFriends(fetchAnotherData.filter(friend => myData.others.friends.includes(friend.main.naverId)));
      } catch (error) {
        console.error("에러!!: ", error);
      } finally {
        setIsLoding(true);
      }
    }
    fetchData();
  }, [myData]);

  const value = { users, friends, isLoding }

  return (
    <AnotherUsersContext.Provider value={value}>
      {children}
    </AnotherUsersContext.Provider>
  )
}

export const useUsersData = () => {
  const context = useContext(AnotherUsersContext);
  if (context === undefined) {
    throw new Error('useUsersData must be used within a AnotherUsersDataProvider');
  }
  return context;
}