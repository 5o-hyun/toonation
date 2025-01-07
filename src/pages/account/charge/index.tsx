import { useState } from "react";
import { AiFillCloseCircle, AiFillPlusCircle } from "react-icons/ai";
import { TiArrowSortedDown } from "react-icons/ti";
import { prices } from "../../../lib/data/charge";
import BottomSheet from "../../../components/account/charge/BottomSheet";
import useToggle from "../../../lib/hook/useToggle";
import { useNavigate } from "react-router-dom";

const ChargePage = () => {
  const [price, setPrice] = useState<number>(3000);
  const [payMethod, setPayMethod] = useState<string>("");
  const [activeRadio, setActiveRadio] = useState<"korea" | "global">("korea");
  const [isOpenBottomSheet, toggleOpenBottomSheet] = useToggle();
  const navigate = useNavigate();

  const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsePrice = (value: string) =>
      parseInt(value.replace(/,/g, ""), 10) || 0;

    setPrice(parsePrice(e.target.value));
  };

  const onChangePayMethod = (method: string) => {
    setPayMethod(method);
  };

  const onClickReset = () => {
    setPrice(0);
  };

  const onClickPlusPrice = (cash: number) => {
    setPrice((prev) => prev + cash);
  };

  const onClickRadio = (value: "korea" | "global") => {
    setActiveRadio(value);
  };

  const onSubmit = () => {
    if (payMethod === "문화상품권") {
      return navigate("/account/charge/culturepay");
    }

    navigate("/account/charge/success");
  };

  return (
    <div className="relative m-5 border-[1px] border-solid w-96">
      <h1 className="bg-gray-100 text-center font-bold text-lg py-2">
        충전하기
      </h1>
      <div className="p-5 flex flex-col gap-2 border-b-8 border-gray-100">
        <p className="font-bold text-[18px]">충전 금액</p>
        <div className="border-[1px] border-solid px-3 py-2 rounded-lg flex justify-between">
          <input
            value={price.toLocaleString()}
            onChange={onChangePrice}
            className="text-xl font-bold w-60"
          />
          <div className="flex gap-2 items-center">
            <AiFillCloseCircle
              onClick={onClickReset}
              className="w-5 h-5 text-gray-200 cursor-pointer"
            />
            <b className="whitespace-nowrap">캐시</b>
          </div>
        </div>
        <div className="flex justify-between gap-2">
          {prices.map((price) => (
            <button
              key={price.id}
              onClick={() => onClickPlusPrice(price.cash)}
              className="flex-1 border-[1px] border-solid rounded-lg py-2 bg-gray-50 text-gray-600 font-medium hover:bg-gray-200"
            >
              <span className="text-blue-400">+</span>
              {price.cash.toLocaleString()}
            </button>
          ))}
        </div>
        <p className="text-[14px] text-gray-500">
          * 충전 금액은 1,000 캐시 단위로만 결제 가능합니다.
        </p>
      </div>
      <div className="border-b-8 border-gray-100">
        <div className="p-5 flex justify-between">
          <p className="font-bold text-[18px]">결제수단</p>
          {activeRadio === "korea" && (
            <button
              onClick={toggleOpenBottomSheet}
              className="flex items-center border-[1px] px-3 py-1 rounded-lg font-medium"
            >
              결제수단변경
              <TiArrowSortedDown className="w-5 h-5" />
            </button>
          )}
        </div>
        <div className="flex flex-col">
          <div className="px-5 flex gap-2 mb-3">
            <input
              type="radio"
              id="korea"
              name="korea"
              value="korea"
              checked={activeRadio === "korea"}
              onChange={() => onClickRadio("korea")}
            />
            <label htmlFor="korea" className="font-bold cursor-pointer">
              국내 결제
            </label>
          </div>
          {activeRadio === "korea" && (
            <div className="bg-gray-100 p-5 flex justify-center gap-3 mb-3 overflow-auto">
              {payMethod !== "" ? (
                <button className="bg-gray-50 w-60 h-36 rounded-lg shadow-md flex flex-col justify-center items-center gap-1">
                  <p className="text-[14px]">{payMethod}</p>
                </button>
              ) : (
                <button
                  onClick={toggleOpenBottomSheet}
                  className="bg-gray-50 w-60 h-36 rounded-lg shadow-md flex flex-col justify-center items-center gap-1"
                >
                  <AiFillPlusCircle className="w-7 h-7 text-blue-400" />
                  <p className="text-[14px]">결제수단 추가</p>
                </button>
              )}
            </div>
          )}
          <div className="px-5 flex gap-2 mb-3">
            <input
              type="radio"
              id="global"
              name="global"
              value="global"
              checked={activeRadio === "global"}
              onChange={() => onClickRadio("global")}
            />
            <label htmlFor="global" className="font-bold cursor-pointer">
              해외 결제
            </label>
          </div>
          {activeRadio === "global" && (
            <div className="grid grid-cols-2 gap-2 px-5 pb-5">
              <button
                onClick={() => onChangePayMethod("신용카드(VISA/MASTER/JCB)")}
                className={`border-[1px] bg-gray-50 rounded-lg text-gray-500 py-2 leading-5 hover:bg-gray-200 ${
                  payMethod === "신용카드(VISA/MASTER/JCB)" &&
                  "!bg-blue-100 border-blue-400 border-2"
                }`}
              >
                <b
                  className={`${
                    payMethod === "신용카드(VISA/MASTER/JCB)" && "text-blue-400"
                  }`}
                >
                  신용카드
                </b>
                <p className="text-[14px]">(VISA/MASTER/JCB)</p>
              </button>
              <button
                onClick={() => onChangePayMethod("신용카드(AMEX)")}
                className={`border-[1px] bg-gray-50 rounded-lg text-gray-500 py-2 leading-5 hover:bg-gray-200 ${
                  payMethod === "신용카드(AMEX)" &&
                  "!bg-blue-100 border-blue-400 border-2"
                }`}
              >
                <b
                  className={`${
                    payMethod === "신용카드(VISA/MASTER/JCB)" && "text-blue-400"
                  }`}
                >
                  신용카드
                </b>
                <p className="text-[14px]">(AMEX)</p>
              </button>
              <button
                onClick={() => onChangePayMethod("유니온페이")}
                className={`border-[1px] bg-gray-50 rounded-lg text-gray-500 py-2 leading-5 hover:bg-gray-200 ${
                  payMethod === "유니온페이" &&
                  "!bg-blue-100 border-blue-400 border-2"
                }`}
              >
                <b
                  className={`${payMethod === "유니온페이" && "text-blue-400"}`}
                >
                  유니온페이
                </b>
              </button>
              <button
                onClick={() => onChangePayMethod("신용카드(VISA/MASTER)")}
                className={`border-[1px] bg-gray-50 rounded-lg text-gray-500 py-2 leading-5 hover:bg-gray-200 ${
                  payMethod === "신용카드(VISA/MASTER)" &&
                  "!bg-blue-100 border-blue-400 border-2"
                }`}
              >
                <b
                  className={`${
                    payMethod === "신용카드(VISA/MASTER)" && "text-blue-400"
                  }`}
                >
                  신용카드
                </b>
                <p className="text-[14px]">(VISA/MASTER)</p>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between mb-3 text-[18px] mb-5">
          <b>최종 결제 금액</b>
          <b>{(price * 1.1).toLocaleString()}원</b>
        </div>
        <div className="text-[14px] text-gray-500 mb-5">
          <p>* 캐시 유효기간: 마지막 사용일로부터 5년</p>
          <p>* 결제 금액에는 모든 세금이 포함되어 있습니다.</p>
          <p>
            * 만 19세 미만 미성년자 회원은 법정대리인 동의가 필요하며, 동의가
            완료된 후 캐시 충전 서비스 이용이 가능합니다.
          </p>
        </div>
        <button
          disabled={payMethod === "" || price <= 1000}
          onClick={onSubmit}
          className="bg-blue-400 w-full py-3 text-white font-bold text-[18px] rounded-lg disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          충전하기
        </button>
      </div>
      {isOpenBottomSheet && (
        <BottomSheet
          onChange={onChangePayMethod}
          onClose={toggleOpenBottomSheet}
        />
      )}
    </div>
  );
};

export default ChargePage;
