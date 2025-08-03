import heartImg from '../../assets/heart.png';

export default function ReviewBox({review}) {
  const {user1, user2, content} = review;

  return (
    <div className="flex flex-col items-center w-[400px] h-[300px] bg-white/60 rounded-3xl shadow-2xl">
      
      <div className="font-black text-2xl flex mt-4 py-3 px-12 gap-2 border-b-2 border-b-stone-400">
        <span>{user1}</span>
        <img src={heartImg} className="w-9 h-9" />
        <span>{user2}</span>
      </div>

      <p className="font-black text-stone-800 p-8">
        {content}
      </p>
      
    </div>
  );
}