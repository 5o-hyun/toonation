type Props = {
  value: string;
  isDisabled: boolean;
  onClick: () => void;
  onChange: (value: string) => void;
};

const Input = ({ value, isDisabled, onClick, onChange }: Props) => {
  return (
    <div className="flex gap-2 w-full">
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`border-[1px] rounded-lg bg-gray-50 p-3 flex-1 ${
          isDisabled && "cursor-not-allowed text-gray-400 bg-gray-200"
        }`}
        placeholder="문화상품권 핀번호 입력(18자리)"
        disabled={isDisabled}
      />
      <button
        disabled={value.length <= 18 || isDisabled}
        onClick={onClick}
        className="rounded-lg bg-blue-400 px-4 text-white font-bold disabled:bg-blue-300 disabled:cursor-not-allowed"
      >
        조회
      </button>
    </div>
  );
};

export default Input;
