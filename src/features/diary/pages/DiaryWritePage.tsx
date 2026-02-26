
import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { createDiary, getDiary, updateDiary } from '../api/diaryApi';
import type { Emotion } from '../types/diary.types';

type EmotionStyle = {
  bg: string;
  border: string;
  ring: string;
  button: string;
  label: string;
  emoji: string;
};

const EMOTION_STYLES: Record<Emotion, EmotionStyle> = {
  HAPPY: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    ring: 'focus:ring-yellow-300',
    button: 'bg-yellow-400 hover:bg-yellow-500',
    label: '행복해',
    emoji: '😊',
  },
  SAD: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    ring: 'focus:ring-blue-300',
    button: 'bg-blue-400 hover:bg-blue-500',
    label: '슬퍼',
    emoji: '😢',
  },
  ANGRY: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    ring: 'focus:ring-red-300',
    button: 'bg-red-400 hover:bg-red-500',
    label: '화나',
    emoji: '😠',
  },
  CALM: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    ring: 'focus:ring-purple-300',
    button: 'bg-purple-400 hover:bg-purple-500',
    label: '평온해',
    emoji: '😴',
  },
};

const VALID_EMOTIONS = Object.keys(EMOTION_STYLES) as Emotion[];

function toEmotion(value: string | undefined): Emotion {
  return VALID_EMOTIONS.includes(value as Emotion) ? (value as Emotion) : 'HAPPY';
}

function DiaryWritePage() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const isEditMode = !!id;

  const stateEmotion = (location.state as { emotion?: string } | null)?.emotion;
  const [form, setForm] = useState({ content: '', emotion: toEmotion(stateEmotion) });
  const [fetching, setFetching] = useState(isEditMode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEditMode) return;
    getDiary(Number(id))
      .then((res) => {
        if (res.code === 'SUCCESS') {
          setForm({ content: res.data.content, emotion: toEmotion(res.data.emotion) });
        }
      })
      .finally(() => setFetching(false));
  }, [id, isEditMode]);

  const style = EMOTION_STYLES[form.emotion];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isEditMode) {
        const result = await updateDiary(Number(id), { content: form.content, emotion: form.emotion });
        if (result.code === 'SUCCESS') {
          navigate(`/diary/${id}`);
        } else {
          setError(result.message || '수정에 실패했습니다.');
        }
      } else {
        const result = await createDiary({ content: form.content, emotion: form.emotion });
        if (result.code === 'SUCCESS') {
          navigate('/diary');
        } else {
          setError(result.message || '저장에 실패했습니다.');
        }
      }
    } catch {
      setError('서버와 통신 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <p className="p-8 text-center text-gray-500">불러오는 중...</p>;

  return (
    <div className={`min-h-screen ${style.bg}`}>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <button
          onClick={() => navigate(isEditMode ? `/diary/${id}` : '/')}
          className="text-sm text-gray-500 hover:text-gray-700 mb-8 inline-block"
        >
          ← {isEditMode ? '상세로' : '처음으로'}
        </button>

        <div className="mb-8 flex items-center gap-3">
          <span className="text-4xl">{style.emoji}</span>
          <div>
            <p className="text-sm text-gray-400">오늘의 감정</p>
            <h1 className="text-2xl font-bold text-gray-800">{style.label}</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            name="content"
            value={form.content}
            onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
            placeholder="오늘 하루를 기록해보세요..."
            required
            rows={12}
            className={`w-full px-4 py-3 rounded-lg border ${style.border} bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 ${style.ring} resize-none`}
          />

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white font-semibold rounded-lg ${style.button} disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors`}
          >
            {loading ? '저장 중...' : isEditMode ? '수정 완료' : '일기 저장'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default DiaryWritePage;
