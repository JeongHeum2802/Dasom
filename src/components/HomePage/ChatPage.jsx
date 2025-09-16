import { useState, useEffect } from 'react';

export default function ChatPage({ myId, youId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchChatroom() {
      const bodyData = { myNaverId: myId, you: youId };
      try {
        const res = await fetch('/api/chatRoom', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        });

        const resData = await res.json();
        console.log(resData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchChatroom();
    setMessages(messages);
  }
    , []);

  return (
    <div className="flex-1 flex flex-col">
      {/* 헤더 */}
      <header className="p-3 flex items-center gap-3 border-b bg-white/70 backdrop-blur">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-sm font-medium">
          춘
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">춘자</span>
          <span className="text-xs text-emerald-600">온라인</span>
        </div>
        <div className="ml-auto text-xs text-gray-400">채팅방</div>
      </header>

      {/* 메시지 영역 */}
      <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {/* 날짜 디바이더 */}
        <div className="flex justify-center my-2">
          <span className="px-3 py-1 text-xs text-gray-600 bg-white border rounded-full shadow-sm">
            2025-09-16 (화)
          </span>
        </div>

        <ul className="space-y-3">
          {/* 상대 메시지 */}
          <li className="flex items-end gap-2 justify-start">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 text-[10px] text-gray-700">
              춘
            </div>
            <div>
              <div className="max-w-[72%] rounded-2xl rounded-tl-sm bg-white border border-gray-200 px-3 py-2 text-sm shadow-sm">
                안녕! 오늘 일정 어때?
              </div>
              <div className="mt-1 ml-1 text-[11px] text-gray-400">오전 11:20</div>
            </div>
          </li>

          {/* 내 메시지 */}
          <li className="flex items-end gap-2 justify-end">
            <div>
              <div className="max-w-[72%] rounded-2xl rounded-tr-sm bg-blue-500 text-white px-3 py-2 text-sm shadow">
                하이 🙂 오후에 가능해!
              </div>
              <div className="mt-1 mr-1 text-right text-[11px] text-gray-400">오전 11:21</div>
            </div>
          </li>

          {/* 상대 메시지 (조금 긴 텍스트 예시) */}
          <li className="flex items-end gap-2 justify-start">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 text-[10px] text-gray-700">
              춘
            </div>
            <div>
              <div className="max-w-[72%] rounded-2xl rounded-tl-sm bg-white border border-gray-200 px-3 py-2 text-sm shadow-sm">
                그럼 3시에 보자~ 장소는 카페 모카모카 어때?
              </div>
              <div className="mt-1 ml-1 text-[11px] text-gray-400">오전 11:23</div>
            </div>
          </li>

          {/* 내 메시지 */}
          <li className="flex items-end gap-2 justify-end">
            <div>
              <div className="max-w-[72%] rounded-2xl rounded-tr-sm bg-blue-500 text-white px-3 py-2 text-sm shadow">
                오케이! 거기서 보자 🙌
              </div>
              <div className="mt-1 mr-1 text-right text-[11px] text-gray-400">오전 11:24</div>
            </div>
          </li>
        </ul>
      </main>

      {/* 입력 영역 (비활성/껍데기) */}
      <div className="h-18 border-t bg-white p-3">
        <div className="flex items-center gap-2">
          <input
            disabled
            type="text"
            placeholder="메시지를 입력하세요 (UI만, 동작 없음)"
            className="flex-1 rounded-xl border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-500 placeholder:text-gray-400 cursor-not-allowed"
          />
          <button
            disabled
            className="rounded-xl px-4 py-2 text-sm font-medium bg-blue-500 text-white/70 cursor-not-allowed"
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
}