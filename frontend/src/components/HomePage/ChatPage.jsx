import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3000'; // 서버 주소

export default function ChatPage({ myId, opponent, onClickBack }) {
  const socketRef = useRef(null);

  const [roomId, setRoomId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  
  // 1) 채팅방 Id, history
  useEffect(() => {
    async function fetchChatroom() {
      try {
        const bodyData = { myNaverId: myId, you: opponent.naverId };

        // chatRoom message와 id 받기
        const res = await fetch('/api/chatRoom', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bodyData),
        });
        const data = await res.json();

        if (!data?.roomId) throw new Error('roomId가 응답에 없습니다.');
        setRoomId(data.roomId);
        setMessages(data.messages);
      }
      catch (err) {
        console.error('[chatRoom fetch error]', err);
      }
    }

    fetchChatroom();
    setLoading(false);
  }, [myId, opponent]);

  // 2) 소켓 연결 & 방 입장 & 이벤트 바인딩
  useEffect(() => {
    if (!roomId) return;

    const socket = io(SOCKET_URL, {
      transports: ['websocket'],
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      // 방 입장
      socket.emit('joinRoom', roomId);
    });

    // 서버 브로드캐스트 수신
    socket.on('receiveMessage', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off('receiveMessage');
      socket.disconnect();
      socketRef.current = null;
    };
  }, [roomId]);

  // 3) 메시지 전송
  const handleSend = () => {
    if (!text.trim() || !roomId || !socketRef.current) return;

    // 서버로 전송 (ACK 사용하면 성공/실패 핸들링 가능)
    socketRef.current.emit(
      'sendMessage',
      { roomId, senderId: myId, text: text.trim() },
      (ack) => {
        if (ack && ack.ok === false) {
          console.error('sendMessage failed:', ack.error);
        }
      }
    );

    setText('');
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm text-gray-500">
        채팅방 정보 불러오는 중…
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* 헤더 */}
      <header className="p-3 flex items-center gap-3 border-b bg-white/70 backdrop-blur">
        <img src={opponent.profileImageUrl} className="h-10 w-10 rounded-full bg-gray-200" />
        <div className="flex flex-col">
          <span className="text-sm font-semibold">{opponent.name}</span>
        </div>
        <button onClick={onClickBack} className="ml-auto text-xs text-gray-400 hover:text-gray-600">나가기</button>
      </header>

      {/* 메시지 영역 */}
      <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <ul className="space-y-3">
          {messages.map((m) => {
            const mine = String(m.sender) === String(myId);
            return (
              <li key={m._id} className={`flex items-end gap-2 ${mine ? 'justify-end' : 'justify-start'}`}>
                {!mine && (
                  <img src={opponent.profileImageUrl} className="h-7 w-7 rounded-full bg-gray-200" />
                )}
                <div>
                  <div className={`max-w-[72%] rounded-2xl ${mine ? 'rounded-tr-sm bg-blue-500 text-white shadow' : 'rounded-tl-sm bg-white border border-gray-200 shadow-sm'} px-3 py-2 text-sm`}>
                    {m.text}
                  </div>
                  <div className={`mt-1 ${mine ? 'text-right mr-1' : 'ml-1'} text-[11px] text-gray-400`}>
                    {m.createdAt ? new Date(m.createdAt).toLocaleTimeString() : ''}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </main>

      {/* 입력 영역 */}
      <div className="h-18 border-t bg-white p-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
            placeholder="메시지를 입력하세요"
            className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm"
          />
          <button
            onClick={handleSend}
            className="rounded-xl px-4 py-2 text-sm font-medium bg-blue-500 text-white disabled:opacity-50"
            disabled={!text.trim() || !roomId}
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
}
