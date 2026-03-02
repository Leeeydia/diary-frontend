import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createPost, getPost, updatePost } from '../api/boardApi';
import Header from '../../../shared/components/Header';

function BoardWritePage() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const isEditMode = !!id;

  const [form, setForm] = useState({ title: '', content: '' });
  const [fetching, setFetching] = useState(isEditMode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 수정 모드: 기존 게시글 데이터 로드
  useEffect(() => {
    if (!isEditMode) return;
    getPost(Number(id))
      .then((res) => {
        if (res.code === 'SUCCESS') {
          setForm({ title: res.data.title, content: res.data.content });
        }
      })
      .finally(() => setFetching(false));
  }, [id, isEditMode]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isEditMode) {
        const res = await updatePost(Number(id), form);
        if (res.code === 'SUCCESS') {
          navigate(`/board/${id}`);
        } else {
          setError(res.message || '수정에 실패했습니다.');
        }
      } else {
        const res = await createPost(form);
        if (res.code === 'SUCCESS') {
          navigate('/board');
        } else {
          setError(res.message || '작성에 실패했습니다.');
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-2xl mx-auto p-8">
        <button
          onClick={() => navigate(isEditMode ? `/board/${id}` : '/board')}
          className="text-sm text-gray-500 hover:text-gray-700 mb-6 inline-block"
        >
          ← {isEditMode ? '상세로' : '목록으로'}
        </button>

        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {isEditMode ? '게시글 수정' : '게시글 작성'}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            placeholder="제목을 입력하세요"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <textarea
            name="content"
            placeholder="내용을 입력하세요"
            value={form.content}
            onChange={handleChange}
            required
            rows={12}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
          />

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? '저장 중...' : isEditMode ? '수정 완료' : '작성 완료'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BoardWritePage;
