import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDiary, deleteDiary, createDiaryReply } from "../api/diaryApi";
import { getMe } from "../../member/api/memberApi";
import type { Diary, DiaryReply } from "../types/diary.types";
import Header from "../../../shared/components/Header";

function DiaryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [diary, setDiary] = useState<Diary | null>(null);
  const [aiReply, setAiReply] = useState<DiaryReply | null>(null);
  const [isDiaryLoading, setIsDiaryLoading] = useState(true);
  const [isReplyLoading, setIsReplyLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const diaryId = Number(id);

    setIsDiaryLoading(true);
    setError(null);

    Promise.all([getDiary(diaryId), getMe()])
      .then(([diaryRes, memberRes]) => {
        if (diaryRes.code !== "SUCCESS") {
          setError(diaryRes.message || "일기를 불러오지 못했습니다.");
          return;
        }
        if (memberRes.code !== "SUCCESS") {
          setError(memberRes.message || "사용자 정보를 불러오지 못했습니다.");
          return;
        }

        setDiary(diaryRes.data);
        setIsDiaryLoading(false);

        setIsReplyLoading(true);
        return createDiaryReply(diaryId);
      })
      .then((replyRes) => {
        if (!replyRes) return;
        if (replyRes.code === "SUCCESS") {
          setAiReply(replyRes.data);
        } else {
          setError(replyRes.message || "AI 답장을 불러오지 못했습니다.");
        }
      })
      .catch(() => {
        setError("서버와 통신 중 오류가 발생했습니다.");
      })
      .finally(() => {
        setIsDiaryLoading(false);
        setIsReplyLoading(false);
      });
  }, [id]);

  const handleDelete = async () => {
    if (!diary) return;
    await deleteDiary(diary.id);
    navigate("/diary");
  };

  if (isDiaryLoading) {
    return <p className="p-8 text-center text-gray-500">불러오는 중...</p>;
  }

  if (error && !diary) {
    return <p className="p-8 text-center text-red-500">{error}</p>;
  }

  if (!diary) {
    return (
      <p className="p-8 text-center text-gray-500">일기를 찾을 수 없습니다.</p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-2xl mx-auto p-8">
        <button
          onClick={() => navigate("/diary")}
          className="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block"
        >
          ← 목록으로
        </button>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-400 mb-6">
            {new Date(diary.createdAt).toLocaleDateString("ko-KR")}
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

        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">AI 답장</h2>

          {isReplyLoading && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-2 text-gray-400">
                <span className="animate-pulse">●</span>
                <span className="animate-pulse delay-75">●</span>
                <span className="animate-pulse delay-150">●</span>
                <span className="ml-2 text-sm">AI가 답장을 쓰고 있어요...</span>
              </div>
            </div>
          )}

          {!isReplyLoading && error && (
            <div className="bg-red-50 rounded-lg border border-red-200 p-6">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {!isReplyLoading && aiReply && (
            <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
              <p className="text-gray-700 whitespace-pre-wrap">
                {aiReply.replyContent}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DiaryDetailPage;
