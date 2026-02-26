import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDiary, deleteDiary } from '../api/diaryApi';
import type { Diary } from '../types/diary.types';

function DiaryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [diary, setDiary] = useState<Diary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getDiary(Number(id))
      .then((res) => {
        if (res.code === 'SUCCESS') setDiary(res.data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!diary) return;
    await deleteDiary(diary.id);
    navigate('/diary');
  };

  if (loading) return <p className="p-8 text-center text-gray-500">불러오는 중...</p>;
  if (!diary) return <p className="p-8 text-center text-gray-500">일기를 찾을 수 없습니다.</p>;

  return (
    <div className="max-w-2xl mx-auto p-8">
      <button
        onClick={() => navigate('/diary')}
        className="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block"
      >
        ← 목록으로
      </button>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <p className="text-sm text-gray-400 mb-6">
          {new Date(diary.createdAt).toLocaleDateString('ko-KR')}
        </p>
        <p className="text-gray-700 whitespace-pre-wrap">{diary.content}</p>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => navigate(`/diary/${diary.id}/edit`)}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
        >
          수정
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          삭제
        </button>
      </div>
    </div>
  );
}

export default DiaryDetailPage;
