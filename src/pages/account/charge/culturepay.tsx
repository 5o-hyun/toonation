import { GoPlus } from "react-icons/go";
import Input from "../../../components/account/charge/Input";
import { useState } from "react";
import useToggle from "../../../lib/hook/useToggle";
import { useNavigate } from "react-router-dom";

const CulturePayPage = () => {
  const [price, setPrice] = useState<number>(0);
  const [pins, setPins] = useState<{ value: string; isDisabled: boolean }[]>([
    { value: "", isDisabled: false },
    { value: "", isDisabled: false },
    { value: "", isDisabled: false },
  ]);
  const [isAgree, toggleAgree] = useToggle();
  const navigate = useNavigate();

  const handlePinChange = (index: number, value: string) => {
    setPins((prev) => {
      const updatedPins = [...prev];
      updatedPins[index].value = value;
      return updatedPins;
    });
  };

  const addPinInput = () => {
    if (pins.length < 5) {
      setPins((prev) => [...prev, { value: "", isDisabled: false }]);
    }
  };

  const onClickInputButton = (index: number) => {
    const currentPin = pins[index];
    if (pins.filter((pin) => pin.value === currentPin.value).length > 1) {
      return alert("이미 등록된 번호입니다.");
    }
    if (/^(\d)\1+$/.test(currentPin.value)) {
      return alert("사용된 번호입니다.");
    }

    setPrice((prev) => prev + 5000);
    setPins((prev) => {
      const updatedPins = [...prev];
      updatedPins[index].isDisabled = true;
      return updatedPins;
    });
  };

  return (
    <div className="relative m-5 border-[1px] border-solid w-96">
      <p className="bg-gray-100 text-center font-bold text-lg py-2">
        문화상품권 충전
      </p>
      <div className="p-5 border-b-8 border-gray-100">
        <p className="font-bold text-[18px] mb-2">핀번호 직접입력</p>
        <div className="w-full flex flex-col gap-2 mb-2">
          {pins.map((pin, index) => (
            <Input
              key={index}
              value={pin.value}
              isDisabled={pin.isDisabled}
              onChange={(value) => handlePinChange(index, value)}
              onClick={() => onClickInputButton(index)}
            />
          ))}
        </div>
        {pins.length < 5 && (
          <div
            onClick={addPinInput}
            className="flex items-center cursor-pointer"
          >
            <GoPlus className="w-4 h-4" />
            <p className="text-gray-500">핀번호 추가 (5개까지 추가 가능)</p>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col gap-3">
        <div className="flex justify-between font-bold">
          <p>충전 금액</p>
          <p>{price} 원</p>
        </div>
        <div className="flex justify-between font-bold border-b-[1px] pb-3">
          <p>수수료</p>
          <p>{price * 0.1} 원</p>
        </div>
        <div className="flex justify-between font-bold text-[18px]">
          <p>총 충전 캐시</p>
          <p>{price - price * 0.1} 캐시</p>
        </div>
      </div>
      <div className="p-5 bg-gray-50 flex flex-col gap-2">
        <p className="font-bold text-gray-600">유의사항</p>
        <p className="text-gray-600 text-[14px]">
          * 캐시 충전 완료된 핀번호는 취소 불가합니다.
        </p>
        <button className="border-[1px] rounded-lg bg-white p-3 flex items-center">
          <input
            type="checkbox"
            id="checkbox"
            onClick={toggleAgree}
            className="w-4 h-4"
          />
          <label htmlFor="checkbox" className="text-[13px] ml-2 cursor-pointer">
            유의사항을 확인하였으며 문화상품권 충전에 동의합니다
          </label>
        </button>
        <button
          disabled={price < 5000 || !isAgree}
          onClick={() => navigate("/account/charge/success")}
          className="bg-blue-400 w-full py-3 text-white font-bold text-[18px] rounded-lg disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          충전하기
        </button>
      </div>
    </div>
  );
};

export default CulturePayPage;
