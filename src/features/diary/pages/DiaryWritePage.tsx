import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createDiary } from '../api/diaryApi';
import type { Emotion } from '../../home/types/home.types';

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
  TIRED: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    ring: 'focus:ring-purple-300',
    button: 'bg-purple-400 hover:bg-purple-500',
    label: '피곤해',
    emoji: '😴',
  },
};

const VALID_EMOTIONS = Object.keys(EMOTION_STYLES) as Emotion[];

function DiaryWritePage() {
  const { emotion } = useParams<{ emotion: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const currentEmotion: Emotion = VALID_EMOTIONS.includes(emotion as Emotion)
    ? (emotion as Emotion)
    : 'HAPPY';

  const style = EMOTION_STYLES[currentEmotion];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result = await createDiary({ ...form, emotion: currentEmotion });
      if (result.code === 'SUCCESS') {
        navigate(`/diary/${result.data.id}`);
      } else {
        setError(result.message || '저장에 실패했습니다.');
      }
    } catch {
      setError('서버와 통신 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${style.bg}`}>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <button
          onClick={() => navigate('/')}
          className="text-sm text-gray-500 hover:text-gray-700 mb-8 inline-block"
        >
          ← 처음으로
        </button>

        <div className="mb-8 flex items-center gap-3">
          <span className="text-4xl">{style.emoji}</span>
          <div>
            <p className="text-sm text-gray-400">오늘의 감정</p>
            <h1 className="text-2xl font-bold text-gray-800">{style.label}</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="제목을 입력하세요"
            required
            className={`w-full px-4 py-3 rounded-lg border ${style.border} bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 ${style.ring}`}
          />
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="오늘 하루를 기록해보세요..."
            required
            rows={12}
            className={`w-full px-4 py-3 rounded-lg border ${style.border} bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 ${style.ring} resize-none`}
          />

          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white font-semibold rounded-lg ${style.button} disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors`}
          >
            {loading ? '저장 중...' : '일기 저장'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default DiaryWritePage;
