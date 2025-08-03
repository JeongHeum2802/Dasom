import { createContext } from 'react';

export const MyDataContext = createContext({
  id: 0,
  friends: [
    { id: 0, name: '친구이름', message: '상태메세지' }
  ],
  chatings: [
    {
      id: 0, name: 'NULL',
      chat: [
        { provider: 'me', context: '나의메세지' },
        { provider: 'you', context: '상대메세지' },
      ]
    }
  ]
});