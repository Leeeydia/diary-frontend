import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createPost, getPost, updatePost } from "../api/boardApi";
import Header from "../../../shared/components/Header";

type Emotion = "HAPPY" | "SAD" | "ANGRY" | "CALM";

function BoardWritePage() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const isEditMode = !!id;

  const [form, setForm] = useState<{
    title: string;
    content: string;
    emotion: Emotion;
  }>({
    title: "",
    content: "",
    emotion: "HAPPY", // 🔥 기본값 반드시 지정
  });

  const [fetching, setFetching] = useState(isEditMode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 수정 모드: 기존 게시글 데이터 로드
  useEffect(() => {
    if (!isEditMode) return;

    getPost(Number(id))
      .then((res) => {
        if (res.code === "SUCCESS") {
          setForm({
            title: res.data.title,
            content: res.data.content,
            emotion: res.data.emotion, // 🔥 기존 감정도 세팅
          });
        }
      })
      .finally(() => setFetching(false));
  }, [id, isEditMode]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    console.log("🔥 보내는 데이터:", form); // 디버깅용

    try {
      if (isEditMode) {
        const res = await updatePost(Number(id), form);
        if (res.code === "SUCCESS") {
          navigate(`/board/${id}`);
        } else {
          setError(res.message || "수정에 실패했습니다.");
        }
      } else {
        const res = await createPost(form);
        if (res.code === "SUCCESS") {
          navigate("/board");
        } else {
          setError(res.message || "작성에 실패했습니다.");
        }
      }
    } catch {
      setError("서버와 통신 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching)
    return <p className="p-8 text-center text-gray-500">불러오는 중...</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-2xl mx-auto p-8">
        <button
          onClick={() => navigate(isEditMode ? `/board/${id}` : "/board")}
          className="text-sm text-gray-500 hover:text-gray-700 mb-6 inline-block"
        >
          ← {isEditMode ? "상세로" : "목록으로"}
        </button>

        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {isEditMode ? "게시글 수정" : "게시글 작성"}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* 제목 */}
          <input
            type="text"
            name="title"
            placeholder="제목을 입력하세요"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          {/* 감정 선택 */}
          <select
            name="emotion"
            value={form.emotion}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="HAPPY">행복</option>
            <option value="SAD">슬픔</option>
            <option value="ANGRY">화남</option>
            <option value="CALM">평온</option>
          </select>

          {/* 내용 */}
          <textarea
            name="content"
            placeholder="내용을 입력하세요"
            value={form.content}
            onChange={handleChange}
            required
            rows={12}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
          />

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "저장 중..." : isEditMode ? "수정 완료" : "작성 완료"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BoardWritePage;
