const Input = () => {
  return (
    <div className="flex gap-2 w-full">
      <input
        className="border-[1px] rounded-lg bg-gray-50 p-3 flex-1"
        placeholder="문화상품권 핀번호 입력(18자리)"
      />
      <button className="rounded-lg bg-blue-400 px-4 text-white font-bold disabled:bg-blue-300 disabled:cursor-not-allowed">
        조회
      </button>
    </div>
  );
};

export default Input;
