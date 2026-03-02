import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../shared/api/axiosInstance";

interface BoardItem {
  id: number;
  memberId: number;
  nickname: string;
  title: string;
  content: string;
  emotion: string;
  createdAt: string;
}

const MyBoardList = () => {
  const navigate = useNavigate();
  const [boards, setBoards] = useState<BoardItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyBoards = async () => {
      try {
        const res = await axiosInstance.get("/api/board/me");
        setBoards(res.data.data ?? []);
      } catch (error) {
        console.error("내 게시글 조회 실패", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyBoards();
  }, []);

  return (
    <div className="rounded-[24px] border border-[#bfbdbd] p-[45px] shadow-md max-989:p-[20px]">
      <h2 className="text-[18px] font-bold mb-4">내가 쓴 게시글</h2>

      {loading && <p className="text-sm text-gray-400">불러오는 중...</p>}

      {!loading && boards.length === 0 && (
        <p className="text-sm text-gray-400">작성한 게시글이 없습니다.</p>
      )}

      {!loading && boards.length > 0 && (
        <ul className="flex flex-col gap-3">
          {boards.map((board) => (
            <li
              key={board.id}
              className="flex justify-between items-center cursor-pointer hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors"
              onClick={() => navigate(`/board/${board.id}`)}
            >
              <div className="flex flex-col">
                <span className="text-gray-800 text-sm font-medium">
                  {board.title}
                </span>
                <span className="text-gray-400 text-xs">{board.nickname}</span>
              </div>

              <span className="text-gray-400 text-xs">
                {new Date(board.createdAt).toLocaleDateString("ko-KR")}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBoardList;
