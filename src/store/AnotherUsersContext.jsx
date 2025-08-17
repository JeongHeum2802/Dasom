import { createContext } from 'react';

export const AnotherUsersContext = createContext([
  {
    main: {
      initUser: true,
      naverId: "NNuH1zGCczSOBB",
      name: 'none',
      profileImageUrl: 'http://localhost:5173/asstes/img.png',
      message: '상태메세지',
      gender: "man",
      MBTI: "ffff",
    },
    others: {
      friends: [],
      socialUrl: "http://temp.com",
    }
  },
]);