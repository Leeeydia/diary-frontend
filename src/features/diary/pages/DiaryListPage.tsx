import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDiaries, deleteDiary } from "../api/diaryApi";
import type { Diary, Emotion } from "../types/diary.types";

type FilterEmotion = Emotion | "ALL";

const FILTER_BUTTONS: {
  value: FilterEmotion;
  label: string;
  emoji: string;
  active: string;
  inactive: string;
}[] = [
  {
    value: "ALL",
    label: "전체",
    emoji: "📋",
    active: "bg-gray-800 text-white",
    inactive: "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50",
  },
  {
    value: "HAPPY",
    label: "HAPPY",
    emoji: "😊",
    active: "bg-yellow-400 text-white",
    inactive:
      "bg-white text-gray-600 border border-gray-300 hover:bg-yellow-50",
  },
  {
    value: "SAD",
    label: "SAD",
    emoji: "😢",
    active: "bg-blue-400 text-white",
    inactive: "bg-white text-gray-600 border border-gray-300 hover:bg-blue-50",
  },
  {
    value: "ANGRY",
    label: "ANGRY",
    emoji: "😠",
    active: "bg-red-400 text-white",
    inactive: "bg-white text-gray-600 border border-gray-300 hover:bg-red-50",
  },
  {
    value: "CALM",
    label: "CALM",
    emoji: "😌",
    active: "bg-green-400 text-white",
    inactive:
      "bg-white text-gray-600 border border-gray-300 hover:bg-green-50",
  },
];

function DiaryListPage() {
  const navigate = useNavigate();
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmotion, setSelectedEmotion] = useState<FilterEmotion>("ALL");

  useEffect(() => {
    setLoading(true);
    const emotion = selectedEmotion === "ALL" ? undefined : selectedEmotion;
    getDiaries(emotion)
      .then((res) => {
        if (res.code === "SUCCESS") setDiaries(res.data);
      })
      .finally(() => setLoading(false));
  }, [selectedEmotion]);

  const handleDelete = async (id: number) => {
    await deleteDiary(id);
    setDiaries((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">내 일기</h1>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          새 일기 작성
        </button>
      </div>

      {/* 감정 필터 */}
      <div className="flex gap-2 flex-wrap mb-6">
        {FILTER_BUTTONS.map((btn) => (
          <button
            key={btn.value}
            onClick={() => setSelectedEmotion(btn.value)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedEmotion === btn.value ? btn.active : btn.inactive
            }`}
          >
            {btn.emoji} {btn.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center text-gray-500">불러오는 중...</p>
      ) : diaries.length === 0 ? (
        <p className="text-center text-gray-500">작성된 일기가 없습니다.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {diaries.map((diary) => (
            <li
              key={diary.id}
              className="p-4 bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p
                    className="text-sm text-gray-600 cursor-pointer hover:text-blue-600"
                    onClick={() => navigate(`/diary/${diary.id}`)}
                  >
                    {diary.content.slice(0, 60)}
                    {diary.content.length > 60 ? "..." : ""}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    {new Date(diary.createdAt).toLocaleDateString("ko-KR")}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(diary.id)}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  삭제
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DiaryListPage;
