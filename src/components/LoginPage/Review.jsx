import ReviewBox from './ReviewBox.jsx';

export default function Review() {
  const reviewData = [
    {
      user1: "정흠",
      user2: "미나",
      content: "정말 좋은 서비스 웹입니다!!"
    },
    {
      user1: "영훈",
      user2: "연주",
      content: "덕분에 인생의 동반자를 찾았습니다.."
    },
    {
      user1: "지호",
      user2: "민주",
      content: "혹시 했는데 정말 좋은 사람 만나서 정말 감사합니다. ㅜㅜ"
    },
    {
      user1: "철수",
      user2: "영희",
      content: "최고의 서비스! 추천합니다."
    },
    {
      user1: "민준",
      user2: "서연",
      content: "여기서 제 인연을 만났어요. 감사합니다!"
    },
    {
      user1: "도윤",
      user2: "하은",
      content: "사용하기 쉽고 편리해서 좋았어요."
    },
  ]

  return (
    <div className="scrollbar-hidden ml-12 mt-12 w-[420px] h-[calc(100vh-200px)] overflow-y-auto">
      <div className="flex flex-col gap-4 pr-2">
        {reviewData.map((ele, idx) => <ReviewBox review={ele} key={idx} />)}
      </div>
    </div>
  );
}