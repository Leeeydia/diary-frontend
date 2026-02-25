import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDiaries, deleteDiary } from '../api/diaryApi';
import type { Diary } from '../types/diary.types';

function DiaryListPage() {
  const navigate = useNavigate();
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDiaries()
      .then((res) => {
        if (res.code === 'SUCCESS') setDiaries(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    await deleteDiary(id);
    setDiaries((prev) => prev.filter((d) => d.id !== id));
  };

  if (loading) return <p className="p-8 text-center text-gray-500">불러오는 중...</p>;

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">내 일기</h1>
        <button
          onClick={() => navigate('/diary/new')}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          새 일기 작성
        </button>
      </div>

      {diaries.length === 0 ? (
        <p className="text-center text-gray-500">작성된 일기가 없습니다.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {diaries.map((diary) => (
            <li key={diary.id} className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h2
                    className="text-lg font-semibold text-gray-800 cursor-pointer hover:text-blue-600"
                    onClick={() => navigate(`/diary/${diary.id}`)}
                  >
                    {diary.title}
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    {new Date(diary.createdAt).toLocaleDateString('ko-KR')}
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
