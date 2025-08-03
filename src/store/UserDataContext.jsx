import { createContext } from 'react';

export const UserDataContext = createContext([
  {
    id: 1,
    name: 'none',
    imgsrc: 'http://localhost:5173/asstes/img.png',
    message: '상태메세지'
  }
]);