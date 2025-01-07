import NaverIcon from "../../../assets/npay.png";
import KakaoIcon from "../../../assets/kakaopay.png";
import TossIcon from "../../../assets/tosspay.png";
import CultureIcon from "../../../assets/culturepay.png";
import { useEffect, useRef } from "react";
import gsap from "gsap";

type Props = {
  onChange: (method: string) => void;
  onClose: () => void;
};

const BottomSheet = ({ onChange, onClose }: Props) => {
  const bottomSheetRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  const payMethods = [
    { id: 1, name: "네이버페이", imagePath: NaverIcon },
    { id: 2, name: "카카오페이", imagePath: KakaoIcon },
    { id: 3, name: "토스페이", imagePath: TossIcon },
    { id: 4, name: "문화상품권", imagePath: CultureIcon },
  ];

  useEffect(() => {
    gsap.fromTo(
      bottomSheetRef.current,
      { y: "100%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 0.5, ease: "power2.out" }
    );

    gsap.fromTo(
      backgroundRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, delay: 0.2 }
    );
  }, []);

  return (
    <div className="absolute top-0 w-full h-full">
      <div
        onClick={onClose}
        ref={backgroundRef}
        className="bg-[rgba(0,0,0,.5)] w-full h-full"
      ></div>
      <div
        ref={bottomSheetRef}
        className="absolute bottom-0 bg-white w-full rounded-t-lg p-5"
      >
        <p className="font-bold text-lg mb-3">결제수단변경</p>
        <div className="grid grid-cols-3 gap-2">
          {payMethods.map((pay) => (
            <button
              key={pay.id}
              onClick={() => onChange(pay.name)}
              className="flex flex-col items-center border-[1px] border-gray-300 rounded-lg py-2 bg-gray-50 gap-1 hover:bg-gray-200"
            >
              <img src={pay.imagePath} alt={pay.name} />
              <p className="text-[12px] text-gray-500">{pay.name}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;
