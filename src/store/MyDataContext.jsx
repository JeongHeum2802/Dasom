import { createContext, useState, useContext } from 'react';

const MyDataContext = createContext(null);

export const MyDataProvider = ({ children }) => {
  // userData State
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const value = { user, login };

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