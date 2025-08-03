import FooterBox from './FooterBox.jsx';

export default function Footer() {
  const liData = {
    "법적 고지" : ["개인정보 처리방침", "대한민국 위치기반서비스 이용약관",
      "이용약관", "쿠키 정책"],
    "채용" : ["채용 안내", "기술 블로그"]
  }

  return (
    <footer className="flex gap-8 ml-8 p-4 my-12">
      <FooterBox title="법적 고지" listData={liData['법적 고지']} />
      <FooterBox title="채용" listData={liData['채용']} />
    </footer>
  );
}