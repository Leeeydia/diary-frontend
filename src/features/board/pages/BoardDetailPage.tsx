import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPost, deletePost } from '../api/boardApi';
import { getMe } from '../../member/api/memberApi';
import type { Post } from '../types/board.types';
import Header from '../../../shared/components/Header';

function BoardDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [currentMemberId, setCurrentMemberId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    Promise.all([getPost(Number(id)), getMe()])
      .then(([postRes, memberRes]) => {
        if (postRes.code === 'SUCCESS') {
          setPost(postRes.data);
        } else {
          setError(postRes.message || '게시글을 불러오지 못했습니다.');
        }
        if (memberRes.code === 'SUCCESS') {
          setCurrentMemberId(memberRes.data.id);
        }
      })
      .catch(() => setError('서버와 통신 중 오류가 발생했습니다.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!post) return;
    await deletePost(post.id);
    navigate('/board');
  };

  // memberId 비교 — username/nickname 문자열 비교보다 신뢰성 높음
  const isAuthor = post !== null && currentMemberId === post.memberId;

  if (loading) return <p className="p-8 text-center text-gray-500">불러오는 중...</p>;
  if (error) return <p className="p-8 text-center text-red-500">{error}</p>;
  if (!post) return <p className="p-8 text-center text-gray-500">게시글을 찾을 수 없습니다.</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-2xl mx-auto p-8">
        <button
          onClick={() => navigate('/board')}
          className="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block"
        >
          ← 목록으로
        </button>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h1>
          <p className="text-sm text-gray-400 mb-6">
            {post.nickname} · {new Date(post.createdAt).toLocaleDateString('ko-KR')}
          </p>
          <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
        </div>

        {/* 작성자 본인에게만 수정/삭제 버튼 표시 */}
        {isAuthor && (
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => navigate(`/board/${post.id}/edit`)}
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
        )}
      </div>
    </div>
  );
}

export default BoardDetailPage;
