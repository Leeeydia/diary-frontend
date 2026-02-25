import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPosts, deletePost } from '../api/boardApi';
import type { Post } from '../types/board.types';

function BoardListPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts()
      .then((res) => {
        if (res.code === 'SUCCESS') setPosts(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    await deletePost(id);
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  if (loading) return <p className="p-8 text-center text-gray-500">불러오는 중...</p>;

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">게시판</h1>
        <button
          onClick={() => navigate('/board/new')}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          글 작성
        </button>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-gray-500">게시글이 없습니다.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {posts.map((post) => (
            <li key={post.id} className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h2
                    className="text-lg font-semibold text-gray-800 cursor-pointer hover:text-blue-600"
                    onClick={() => navigate(`/board/${post.id}`)}
                  >
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    {post.author} · {new Date(post.createdAt).toLocaleDateString('ko-KR')}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(post.id)}
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

export default BoardListPage;
