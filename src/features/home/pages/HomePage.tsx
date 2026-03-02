import { useNavigate } from "react-router-dom";
import type { Emotion, EmotionConfig } from "../types/home.types";
import EmotionCard from "../components/EmotionCard";
import Header from "../../../shared/components/Header";

const EMOTIONS: EmotionConfig[] = [
  {
    value: "HAPPY",
    label: "행복해",
    emoji: "😊",
    cardStyle: "bg-yellow-50 border border-yellow-200",
    buttonStyle: "bg-yellow-400 hover:bg-yellow-500",
  },
  {
    value: "SAD",
    label: "슬퍼",
    emoji: "😢",
    cardStyle: "bg-gray-50 border border-gray-200",
    buttonStyle: "bg-gray-500 hover:bg-gray-600",
  },
  {
    value: "ANGRY",
    label: "화나",
    emoji: "😠",
    cardStyle: "bg-red-50 border border-red-200",
    buttonStyle: "bg-red-400 hover:bg-red-500",
  },
  {
    value: "CALM",
    label: "평온해",

    emoji: "😌",
    cardStyle: "bg-green-50 border border-green-200",
    buttonStyle: "bg-green-400 hover:bg-green-500",
  },
];

function HomePage() {
  const navigate = useNavigate();

  const handleWrite = (emotion: Emotion) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }
    navigate("/write", { state: { emotion } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 pt-16 pb-24">
        <div className="flex flex-col items-center mb-14">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            오늘 기분은 어때?
          </h1>
          <p className="text-sm md:text-base text-gray-400">
            감정을 선택해 일기를 써보세요
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 lg:gap-8">
          {EMOTIONS.map((config) => (
            <EmotionCard
              key={config.value}
              config={config}
              onWrite={() => handleWrite(config.value)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default HomePage;
