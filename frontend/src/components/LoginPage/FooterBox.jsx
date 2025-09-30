
export default function FooterBox({ title, listData }) {

  return (
    <div>
      <span className="font-black text-2xl">{title}</span>
      <ul className="mt-6 flex flex-col gap-2">
        {listData.map((ele, idx) => {
          return (<li
            key={idx}
            className="hover:bg-stone-200 px-1 transition-all duration-300" 
            >
            {ele}
          </li>
          );
        })}
      </ul>
    </div>
  );
}