import { useState, useRef, useEffect } from "react";
import "./css/ChatPage.css"; // Tailwind 제거 후 순수 CSS 적용

export default function ChatExample() {
  const [selectedUser, setSelectedUser] = useState(users[0].name);
  const [messagesMap, setMessagesMap] = useState(() => {
    return { ...chatting };
  });
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);
  const me = "금태양";

  const send = () => {
    if (!input.trim()) return;
    setMessagesMap(prev => {
      const updated = { ...prev };
      updated[selectedUser] = [...(updated[selectedUser] || []),
        {
          id: Date.now(),
          sender: me,
          text: input.trim(),
          read: true,
          time: new Date().toISOString(),
        }
      ];
      return updated;
    });
    setInput("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesMap[selectedUser]]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div ref={bottomRef} className="chat-container" style={{ backgroundImage: 'url("https://media.discordapp.net/attachments/1387695710459265142/1392692936096878644/image-removebg-preview.png?ex=688830de&is=6886df5e&hm=0fa337415eaa65e76db469f06f40d8cbb348152edf87e915baa1f963dd3d8375&=&format=webp&quality=lossless")', 
    backgroundSize: '35%',
    backgroundRepeat: "no-repeat",
    backgroundPosition: 'center' }}>
      <header className="chat-header">현재 대화상대: {selectedUser}</header>
      <AvatarStrip users={users} me={me} onSelect={setSelectedUser} />
      <main className="chat-body">
        {[...(messagesMap[selectedUser] || [])].map((m) => (
          <MessageBubble key={m.id} me={me} {...m} />
        ))}
        <div />
      </main>
      <footer className="chat-footer">
        <textarea
          className="chat-input"
          placeholder="야 호영 넣을게~"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="chat-send" onClick={send}><h1>▶</h1></button>
      </footer>
    </div>
  );
}

function MessageBubble({ sender, text, read, me }) {
  const isMine = sender === me;
  return (
    <div className={`chat-message ${isMine ? "mine" : "yours"}`}>
      {!isMine && <img src={avatarByName(sender)} alt={sender} className="avatar" />}
      <div className="message-bubble">
        <span className="sender-name">
          {sender} {read && <span className="read-label">읽음</span>}
        </span>
        <div className="message-text">{text}</div>
      </div>
      {isMine && <img src={avatarByName(sender)} alt={sender} className="avatar" />}
    </div>
  );
}

function AvatarStrip({ users, onSelect, me }) {
  const handleClick = (name) => {
    onSelect(name);
  };

  return (
    <div className="avatar-strip">
      {users.filter(u => u.name !== me).map((u) => (
        <button key={u.id} className="avatar-item" onClick={() => handleClick(u.name)}>
          <img src={u.avatar} alt={u.name} className="avatar-img" />
          <span className="avatar-name">{u.name}</span>
        </button>
      ))}
    </div>
  );
}

const chatting = {
  "초전자포": [
    { id: 1, sender: "초전자포", text: "미사카 미코토 공부법 알려줄게", read: true },
    { id: 2, sender: "금태양", text: "나 ㅈㅈㅌ인데 학점 4.5라 필요없다", read: true },
    { id: 3, sender: "초전자포", text: "네 서방님..❤️", read: true },
    { id: 4, sender: "초전자포", text: "(레일건 발사)", read: true }
  ],
  "아오오니": [
    { id: 5, sender: "아오오니", text: "텅 비었고 아무것도 없는 자신을 용서할 수 없다면 ㅡ지금 여기서부터 시작하죠. 렘의 멈춰있던 시간을 금태양 군이 움직여 준 것처럼 금태양 군의 멈춰있던 시간을 지금 움직이는 거예요. 여기서부터 시작하죠. 하나부터... 아뇨, 제로부터!", read: true },
    { id: 6, sender: "금태양", text: "그래", read: true }
  ],
  "기타찐따": [
    { id: 7, sender: "기타찐따", text: "아.. 안녕하세요오...", read: true },
    { id: 8, sender: "금태양", text: "넌 나가라", read: true }
  ],
  "국밥호랑이": [
    { id: 9, sender: "국밥호랑이", text: "뜨끈~한 국밥 든든하게 먹고 말지", read: true },
    { id: 10, sender: "금태양", text: "야 호영", read: true },
    { id: 11, sender: "국밥호랑이", text: "무슨 일이야 금태양", read: true }
  ],
  "보라돌이": [
    { id: 12, sender: "보라돌이", text: "이리와 태양아", read: true },
    { id: 13, sender: "금태양", text: "에,, 에이누나!!", read: true }
  ],
  "이기어검녀": [
    { id: 14, sender: "금태양", text: "아이오니아를 위하여!!!", read: true },
    { id: 15, sender: "이기어검녀", text: "뭐야 내 궁 돌려줘요", read: true }
  ],
  "바니걸": [
    { id: 16, sender: "바니걸", text: "이리와 해방해야지", read: true },
    { id: 17, sender: "금태양", text: "신 창 섭", read: true }
  ],
  "자각몽": [
    { id: 18, sender: "자각몽", text: "헤어날 수 없는 꿈에서 발버둥 쳐 본 적이 있나요?", read: true },
    { id: 19, sender: "금태양", text: "뒤로 돌기나 해.", read: true },
    { id: 20, sender: "자각몽", text: "앗..❤️", read: true }
  ],
  "원조바니걸": [
    { id: 21, sender: "금태양", text: "오르카, 그거 해봐, 그거", read: true },
    { id: 22, sender: "원조바니걸", text: "멍청이!! 도둑놈!! 기생오라비!!", read: true },
    { id: 23, sender: "금태양", text: "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ", read: true }
  ],
  "그저빛": [
    { id: 24, sender: "그저빛", text: "데마시아~", read: true },
    { id: 25, sender: "금태양", text: "결코 물러서지 않겠다!!", read: true }
  ],
  "시원한피카츄": [
    { id: 26, sender: "시원한피카츄", text: "아이스에이지", read: true },
    { id: 27, sender: "금태양", text: "햛짝", read: true }
  ]
};


const users = [
  { id: 0, name: "금태양", avatar: "https://s1.pearlcdn.com/KR/Data/UserImg/Customizing/ScreenShot/2022/3/8/cms_1_22030803535735415.jpg" },
  { id: 1, name: "초전자포", avatar: "https://i.namu.wiki/i/Z2rsJ5cqDj2Y-giRFH4sykekBd-waUkhDlas0xc-0FB-ajN2j0MFegDWT0iPwyXNKbpcxyRzDmoBu9IUCQf72A.gif" },
  { id: 2, name: "아오오니", avatar: "https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F2270F642591B0FCE34" },
  { id: 3, name: "기타찐따", avatar: "https://i.namu.wiki/i/iOGo93kErVKpHqOiRgcQNtrpBwD0NM7lNQ26dyLTa11Mh582GZYZlew9Fg4wh-SOYiOStYwYAJugfRFy8QtXRQ.gif" },
  { id: 4, name: "국밥호랑이", avatar: "https://i.namu.wiki/i/tPuq8RxMnfKo1lDD_XZfH8ln_SQy_SSI28ClNJbGK_wRMShJRqjDZpu5EZK6KtQtPQrgeV6qrt2YFIDN3CvrlQ.webp" },
  { id: 5, name: "보라돌이", avatar: "https://dcimg1.dcinside.com/viewimage.php?id=22b3c32eecdc28b461b5d3b602&no=24b0d769e1d32ca73dea87fa11d02831dd19b8e7fc4eb19683da708445d92db2420cbb806657278a7ce07fc70606a2a9bdf6b4fb9116df915dee443bf491c083569dc91e16384a3a" },
  { id: 6, name: "이기어검녀", avatar: "https://mblogthumb-phinf.pstatic.net/MjAxODA4MTZfNTgg/MDAxNTM0Mzk0MDk1Nzgz.IYwXJPS2poDc2h-HQwp-7Urv0nqHj7AVx1i03MfehKUg.yIbHbhgo2F5nIiSyKQmxELlId0wBdmpw2THH2_b64FAg.JPEG.ultimatehyuk/39006.jpg?type=w800" },
  { id: 7, name: "바니걸", avatar: "https://i.namu.wiki/i/Z_2demMphaod_SZ47wjNV9nxyXk5Lmt4zN_GSlLkyR9daBZ1-UW8LfcnhLWtpxp7N4WsaPgkzzWN0dhEbLAXUw.webp" },
  { id: 8, name: "자각몽", avatar: "https://i.namu.wiki/i/m3V9aVm-hvU0y0wEVihULRcQ6AZA08jfdD3FhrNoIB0b4lcK3cKzadSjof2cJG0QdB2Vu25aIq046O4YCZzX9g.webp" },
  { id: 9, name: "원조바니걸", avatar: "https://i.namu.wiki/i/z9XtXnlJroiPq_gAzv76F576V4FJV6lz1tWfUDXt3yDvIL8TU5kWHpFjrLi6vBp6iCUJLqGrkm9V6IX-W54Eww.webp" },
  { id: 10, name: "그저빛", avatar: "https://mblogthumb-phinf.pstatic.net/MjAxNjExMTJfMjIy/MDAxNDc4OTI1Nzk5OTI5.UsHllyw0TNUP3THjFIJpb0vu5DNg2oyR9DHoSheE_G4g.DrACIepDjX7d95V8_D0GmamR39R1uBPtPTugiNQwY9Qg.PNG.kana002/1.png?type=w420" },
  { id: 11, name: "시원한피카츄", avatar: "https://i.namu.wiki/i/zwOl13e8NTpMvInZ4QI7wj78idh-IxJjl9MaTq04EmfsxCbvo73K3tc0HzfN1jhJWPx0fPqHX2kJ3sY2KADd5Q.webp" }
];

function avatarByName(name) {
  const f = users.find((u) => u.name === name);
  return f?.avatar;
}
