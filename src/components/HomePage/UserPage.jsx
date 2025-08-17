
export default function UserPage({ userData, onCloseUserPage }) {
 
  return (
    <div className="h-full flex-1 flex flex-col bg-pink-100 text-gray-800 relative">
      <button onClick={()=>onCloseUserPage(-1)} className="absolute top-6 right-6 text-gray-500 hover:text-gray-800 text-4xl font-bold">&times;</button>
      <div className="flex-10/11 flex flex-col items-center justify-center p-12">
        <img
          src={userData.profileImageUrl}
          alt={`Profile of ${userData.name}`}
          className="w-90 h-90 rounded-full border-8 border-pink-200 shadow-lg mb-12"
        />
        <h1 className="text-5xl font-bold mb-4 text-pink-500">{userData.name}</h1>
        <p className="text-2xl text-center max-w-2xl mt-6 text-gray-700">{userData.message}</p>
      </div>
      <div className="flex-1/11 bg-pink-200 p-6 flex justify-around">
        <button className="bg-pink-400 hover:bg-pink-500 text-white font-bold py-3 px-8 rounded-full transition duration-300">
          친구 추가
        </button>
        <button className="bg-pink-400 hover:bg-pink-500 text-white font-bold py-3 px-8 rounded-full transition duration-300">
          메시지 보내기
        </button>
      </div>
    </div>
  );
}