import { useEffect, useMemo, useRef, useState } from "react";

export default function ChatExample() {
  const me = "금태양";
  const [selectedUser, setSelectedUser] = useState(users[0].name);
  const [messagesMap, setMessagesMap] = useState(() => ({ ...chatting }));
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  const messages = useMemo(() => messagesMap[selectedUser] || [], [messagesMap, selectedUser]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessagesMap((prev) => {
      const next = { ...prev };
      next[selectedUser] = [
        ...(next[selectedUser] || []),
        {
          id: Date.now(),
          sender: me,
          text,
          read: true,
          time: new Date().toISOString(),
        },
      ];
      return next;
    });
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className="flex h-screen flex-col font-sans bg-[#ffaeae]"
      style={{
        backgroundImage:
          'url("https://media.discordapp.net/attachments/1387695710459265142/1392692936096878644/image-removebg-preview.png?ex=688830de&is=6886df5e&hm=0fa337415eaa65e76db469f06f40d8cbb348152edf87e915baa1f963dd3d8375&=&format=webp&quality=lossless")',
        backgroundSize: "35%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Header */}
      <header className="border-b border-gray-300 bg-white p-4 font-bold">
        현재 대화상대: {selectedUser}
      </header>

      {/* Avatar strip */}
      <div className="flex flex-wrap gap-4 border-b border-gray-300 bg-white p-4">
        {users
          .filter((u) => u.name !== me)
          .map((u) => (
            <button
              key={u.id}
              onClick={() => setSelectedUser(u.name)}
              className="group relative w-[150px] rounded-xl bg-white p-3 text-center text-[11px] shadow-sm ring-1 ring-transparent transition hover:bg-gray-100 hover:shadow ring-offset-0"
            >
              <img
                src={u.avatar}
                alt={u.name}
                className="mx-auto h-[100px] w-[100px] rounded-full border-2 border-white shadow"
              />
              <span className="mt-1 block truncate">{u.name}</span>
              {/* unread badge example (computed) */}
              {unreadCount(messagesMap[u.name], me) > 0 && (
                <span className="absolute -right-1 -top-1 rounded-full bg-red-600 px-1.5 text-[10px] font-bold text-white">
                  {unreadCount(messagesMap[u.name], me)}
                </span>
              )}
            </button>
          ))}
      </div>

      {/* Chat body */}
      <main className="flex-1 overflow-y-auto p-4">
        {messages.map((m) => (
          <MessageBubble key={m.id} me={me} {...m} />
        ))}
        <div ref={bottomRef} />
      </main>

      {/* Footer */}
      <footer className="flex gap-2 border-t border-gray-300 bg-white p-4">
        <textarea
          className="min-h-14 flex-1 resize-y rounded-2xl border border-gray-300 p-3 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
          placeholder="야 호영 넣을게~"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={send}
          className="grid min-w-14 place-items-center rounded-full bg-pink-400 px-4 text-white shadow transition hover:bg-pink-500"
          aria-label="send"
        >
          <span className="text-2xl leading-none">▶</span>
        </button>
      </footer>
    </div>
  );
}

function MessageBubble({ sender, text, read, me }) {
  const isMine = sender === me;
  return (
    <div className={`mb-4 flex items-end ${isMine ? "justify-end" : "justify-start"}`}>
      {!isMine && (
        <img
          src={avatarByName(sender)}
          alt={sender}
          className="h-[150px] w-[150px] rounded-full object-cover"
        />
      )}

      <div className="mx-2 flex max-w-[75%] flex-col">
        <span className="mb-1 text-[11px] text-gray-500">
          {sender} {read && <span className="ml-1 font-bold">읽음</span>}
        </span>
        <div className="whitespace-pre-wrap rounded-2xl bg-pink-200 p-3 text-sm text-rose-900 shadow">
          {text}
        </div>
      </div>

      {isMine && (
        <img
          src={avatarByName(sender)}
          alt={sender}
          className="h-[150px] w-[150px] rounded-full object-cover"
        />
      )}
    </div>
  );
}

/*** helpers ***/
function unreadCount(list = [], me) {
  // count partner messages that are not read
  if (!Array.isArray(list)) return 0;
  return list.filter((m) => m.sender !== me && !m.read).length;
}

function avatarByName(name) {
  const f = users.find((u) => u.name === name);
  return f?.avatar;
}

/*** mock data in-file (single-file demo) ***/
const chatting = {
  초전자포: [
    { id: 1, sender: "초전자포", text: "미사카 미코토 공부법 알려줄게", read: true },
    { id: 2, sender: "금태양", text: "나 ㅈㅈㅌ인데 학점 4.5라 필요없다", read: true },
    { id: 3, sender: "초전자포", text: "네 서방님..❤️", read: true },
    { id: 4, sender: "초전자포", text: "(레일건 발사)", read: true },
  ],
  아오오니: [
    {
      id: 5,
      sender: "아오오니",
      text:
        "텅 비었고 아무것도 없는 자신을 용서할 수 없다면 ㅡ지금 여기서부터 시작하죠. 렘의 멈춰있던 시간을 금태양 군이 움직여 준 것처럼 금태양 군의 멈춰있던 시간을 지금 움직이는 거예요. 여기서부터 시작하죠. 하나부터... 아뇨, 제로부터!",
      read: true,
    },
    { id: 6, sender: "금태양", text: "그래", read: true },
  ],
  기타찐따: [
    { id: 7, sender: "기타찐따", text: "아.. 안녕하세요오...", read: true },
    { id: 8, sender: "금태양", text: "넌 나가라", read: true },
  ],
  국밥호랑이: [
    { id: 9, sender: "국밥호랑이", text: "뜨끈~한 국밥 든든하게 먹고 말지", read: true },
    { id: 10, sender: "금태양", text: "야 호영", read: true },
    { id: 11, sender: "국밥호랑이", text: "무슨 일이야 금태양", read: true },
  ],
  보라돌이: [
    { id: 12, sender: "보라돌이", text: "이리와 태양아", read: true },
    { id: 13, sender: "금태양", text: "에,, 에이누나!!", read: true },
  ],
  이기어검녀: [
    { id: 14, sender: "금태양", text: "아이오니아를 위하여!!!", read: true },
    { id: 15, sender: "이기어검녀", text: "뭐야 내 궁 돌려줘요", read: true },
  ],
  바니걸: [
    { id: 16, sender: "바니걸", text: "이리와 해방해야지", read: true },
    { id: 17, sender: "금태양", text: "신 창 섭", read: true },
  ],
  자각몽: [
    { id: 18, sender: "자각몽", text: "헤어날 수 없는 꿈에서 발버둥 쳐 본 적이 있나요?", read: true },
    { id: 19, sender: "금태양", text: "뒤로 돌기나 해.", read: true },
    { id: 20, sender: "자각몽", text: "앗..❤️", read: true },
  ],
  원조바니걸: [
    { id: 21, sender: "금태양", text: "오르카, 그거 해봐, 그거", read: true },
    { id: 22, sender: "원조바니걸", text: "멍청이!! 도둑놈!! 기생오라비!!", read: true },
    {
      id: 23,
      sender: "금태양",
      text:
        "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ",
      read: true,
    },
  ],
  그저빛: [
    { id: 24, sender: "그저빛", text: "데마시아~", read: true },
    { id: 25, sender: "금태양", text: "결코 물러서지 않겠다!!", read: true },
  ],
  시원한피카츄: [
    { id: 26, sender: "시원한피카츄", text: "아이스에이지", read: true },
    { id: 27, sender: "금태양", text: "햛짝", read: true },
  ],
};

const users = [
  {
    id: 0,
    name: "금태양",
    avatar:
      "https://s1.pearlcdn.com/KR/Data/UserImg/Customizing/ScreenShot/2022/3/8/cms_1_22030803535735415.jpg",
  },
  {
    id: 1,
    name: "초전자포",
    avatar:
      "https://i.namu.wiki/i/Z2rsJ5cqDj2Y-giRFH4sykekBd-waUkhDlas0xc-0FB-ajN2j0MFegDWT0iPwyXNKbpcxyRzDmoBu9IUCQf72A.gif",
  },
  {
    id: 2,
    name: "아오오니",
    avatar:
      "https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F2270F642591B0FCE34",
  },
  {
    id: 3,
    name: "기타찐따",
    avatar:
      "https://i.namu.wiki/i/iOGo93kErVKpHqOiRgcQNtrpBwD0NM7lNQ26dyLTa11Mh582GZYZlew9Fg4wh-SOYiOStYwYAJugfRFy8QtXRQ.gif",
  },
  {
    id: 4,
    name: "국밥호랑이",
    avatar:
      "https://i.namu.wiki/i/tPuq8RxMnfKo1lDD_XZfH8ln_SQy_SSI28ClNJbGK_wRMShJRqjDZpu5EZK6KtQtPQrgeV6qrt2YFIDN3CvrlQ.webp",
  },
  {
    id: 5,
    name: "보라돌이",
    avatar:
      "https://dcimg1.dcinside.com/viewimage.php?id=22b3c32eecdc28b461b5d3b602&no=24b0d769e1d32ca73dea87fa11d02831dd19b8e7fc4eb19683da708445d92db2420cbb806657278a7ce07fc70606a2a9bdf6b4fb9116df915dee443bf491c083569dc91e16384a3a",
  },
  {
    id: 6,
    name: "이기어검녀",
    avatar: "https://mblogthumb-phinf.pstatic.net/MjAxODA4MTZfNTgg/MDAxNTM0Mzk0MDk1Nzgz.IYwXJPS2poDc2h-HQwp-7Urv0nqHj7AVx1i03MfehKUg.yIbHbhgo2F5nIiSyKQmxELlId0wBdmpw2THH2_b64FAg.JPEG.ultimatehyuk/39006.jpg?type=w800",
  },
  {
    id: 7,
    name: "바니걸",
    avatar:
      "https://i.namu.wiki/i/Z_2demMphaod_SZ47wjNV9nxyXk5Lmt4zN_GSlLkyR9daBZ1-UW8LfcnhLWtpxp7N4WsaPgkzzWN0dhEbLAXUw.webp",
  },
  {
    id: 8,
    name: "자각몽",
    avatar:
      "https://i.namu.wiki/i/m3V9aVm-hvU0y0wEVihULRcQ6AZA08jfdD3FhrNoIB0b4lcK3cKzadSjof2cJG0QdB2Vu25aIq046O4YCZzX9g.webp",
  },
  {
    id: 9,
    name: "원조바니걸",
    avatar:
      "https://i.namu.wiki/i/z9XtXnlJroiPq_gAzv76F576V4FJV6lz1tWfUDXt3yDvIL8TU5kWHpFjrLi6vBp6iCUJLqGrkm9V6IX-W54Eww.webp",
  },
  {
    id: 10,
    name: "그저빛",
    avatar:
      "https://mblogthumb-phinf.pstatic.net/MjAxNjExMTJfMjIy/MDAxNDc4OTI1Nzk5OTI5.UsHllyw0TNUP3THjFIJpb0vu5DNg2oyR9DHoSheE_G4g.DrACIepDjX7d95V8_D0GmamR39R1uBPtPTugiNQwY9Qg.PNG.kana002/1.png?type=w420",
  },
  {
    id: 11,
    name: "시원한피카츄",
    avatar:
      "https://i.namu.wiki/i/zwOl13e8NTpMvInZ4QI7wj78idh-IxJjl9MaTq04EmfsxCbvo73K3tc0HzfN1jhJWPx0fPqHX2kJ3sY2KADd5Q.webp",
  },
];
