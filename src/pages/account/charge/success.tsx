import { useEffect, useState } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";

const ChargeSuccessPage = () => {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const navigate = useNavigate();
  const { search } = useLocation();
  const price = new URLSearchParams(search).get("price");

  useEffect(() => {
    const storedPrice = Number(localStorage.getItem("price"));
    const updatePrice = storedPrice + Number(price);

    localStorage.setItem("price", updatePrice.toString());
    setTotalPrice(updatePrice);
  }, []);

  return (
    <div className="relative m-5 border-[1px] border-solid w-96">
      <p className="bg-gray-100 text-center font-bold text-lg py-2">충전하기</p>
      {/* 이미지는 아이콘으로 대체하겠습니다! */}
      <div className="flex justify-center my-8">
        <IoIosCheckmarkCircle className="w-20 h-20 text-blue-400" />
      </div>
      <p className="font-bold text-[18px] text-center mb-4">충전 결과</p>
      <div className="flex mx-5 border-[1px] mb-48">
        <div className="w-1/2 border-r-[1px] bg-gray-50">
          <p className="p-3">충전 캐시</p>
          <p className="p-3">보유 캐시 잔액</p>
        </div>
        <div className="w-1/2">
          <p className="p-3 font-bold">
            <b className="text-blue-400">{Number(price).toLocaleString()}</b>{" "}
            캐시
          </p>
          <p className="p-3 font-bold">{totalPrice.toLocaleString()} 캐시</p>
        </div>
      </div>
      <button
        onClick={() => navigate("/account/charge")}
        className="bg-blue-400 w-[calc(100%-40px)] py-3 mx-5 mb-8 text-white font-bold text-[18px] rounded-lg disabled:bg-blue-300 disabled:cursor-not-allowed"
      >
        확인
      </button>
    </div>
  );
};

export default ChargeSuccessPage;
