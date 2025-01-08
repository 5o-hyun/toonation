import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="m-28">
      <p>
        현재 위치는 홈페이지입니다.
        <br />
        충전페이지로 바로 가려면 클릭해주세요.
      </p>
      <button
        onClick={() => navigate("/account/charge")}
        className="bg-blue-400 w-60 py-3 mt-5 text-white font-bold text-[18px] rounded-lg hover:bg-blue-500"
      >
        충전페이지 바로가기
      </button>
    </div>
  );
};

export default HomePage;
