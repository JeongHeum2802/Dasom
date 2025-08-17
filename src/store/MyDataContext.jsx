import { createContext, useState, useContext, useEffect } from 'react';

const MyDataContext = createContext(null);

export const MyDataProvider = ({ children }) => {
  // userData State
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      // 저장된 값이 있으면 JSON으로 파싱, 없으면 null 반환
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      return null;
    }
  });

  useEffect(() => {
    if (user) { // user객체가 있으면 'user'라는 키로 저장
      localStorage.setItem('user', JSON.stringify(user));
    } else { // 로그아웃
      localStorage.removeItem('user');
    }
  }, [user]);

  // userData Set
  const login = (userData) => {
    setUser(userData);
  };

  // logout
  const logout = () => {
    setUser(null);
  }

  const value = { user, login, logout };

  return (
    <MyDataContext.Provider value={value}>
      {children}
    </MyDataContext.Provider>
  )
}

export const useMyData = () => {
  const context = useContext(MyDataContext);
  if (context === undefined) {
    throw new Error('useMyData must be used within a MyDataProvider');
  }
  return context;
}