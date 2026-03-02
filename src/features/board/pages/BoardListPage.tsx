import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts, deletePost } from "../api/boardApi";
import { getMe } from "../../member/api/memberApi";
import type { Post, PostListParams } from "../types/board.types";
import Header from "../../../shared/components/Header";

const EMOTION_OPTIONS = ["", "HAPPY", "SAD", "ANGRY", "CALM"] as const;

const EMOTION_LABELS: Record<string, string> = {
  "": "전체",
  HAPPY: "행복",
  SAD: "슬픔",
  ANGRY: "화남",
  CALM: "평온",
};

function BoardListPage() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState<Post[]>([]);
  const [currentMemberId, setCurrentMemberId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [emotionFilter, setEmotionFilter] = useState<string>("");

  // 현재 로그인 사용자 ID 조회 (작성자 비교용)
  useEffect(() => {
    getMe().then((res) => {
      if (res.code === "SUCCESS") {
        setCurrentMemberId(res.data.id);
      }
    });
  }, []);

  // 게시글 목록 조회
  useEffect(() => {
    const params: PostListParams = {};
    if (emotionFilter) params.emotion = emotionFilter;

    setLoading(true);
    setError(null);

    getPosts(params)
      .then((res) => {
        if (res.code === "SUCCESS") {
          setPosts(res.data ?? []);
        } else {
          setError(res.message || "게시글을 불러오지 못했습니다.");
        }
      })
      .catch(() => {
        setError("서버와 통신 중 오류가 발생했습니다.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [emotionFilter]);

  const handleEmotionChange = (emotion: string) => {
    setEmotionFilter(emotion);
  };

  const handleDelete = async (id: number) => {
    await deletePost(id);
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-2xl mx-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">게시판</h1>
          <button
            onClick={() => navigate("/board/new")}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            글 작성
          </button>
        </div>

        {/* 감정 필터 */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {EMOTION_OPTIONS.map((emotion) => (
            <button
              key={emotion}
              onClick={() => handleEmotionChange(emotion)}
              className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                emotionFilter === emotion
                  ? "bg-gray-400 text-white border-gray-400"
                  : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
              }`}
            >
              {EMOTION_LABELS[emotion]}
            </button>
          ))}
        </div>

        {loading && <p className="text-center text-gray-500">불러오는 중...</p>}

        {!loading && error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {!loading && !error && posts.length === 0 && (
          <p className="text-center text-gray-500">게시글이 없습니다.</p>
        )}

        {!loading && !error && posts.length > 0 && (
          <ul className="flex flex-col gap-4">
            {posts.map((post) => (
              <li
                key={post.id}
                className="p-4 bg-white rounded-lg shadow-sm border border-gray-200"
              >
                <div className="flex justify-between items-start">
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => navigate(`/board/${post.id}`)}
                  >
                    <h2 className="text-lg font-semibold text-gray-800 hover:text-gray-600">
                      {post.title}
                    </h2>
                    <p className="text-sm text-gray-400 mt-1">
                      {post.nickname} ·{" "}
                      {new Date(post.createdAt).toLocaleDateString("ko-KR")}
                    </p>
                  </div>

                  {/* memberId 비교로 본인 게시글에만 수정/삭제 표시 */}
                  {currentMemberId === post.memberId && (
                    <div className="flex gap-3 ml-4 shrink-0">
                      <button
                        onClick={() => navigate(`/board/${post.id}/edit`)}
                        className="text-sm text-yellow-500 hover:text-yellow-700"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="text-sm text-red-500 hover:text-red-700"
                      >
                        삭제
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default BoardListPage;
