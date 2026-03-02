import { useEffect, useState, useRef } from "react";
import axiosInstance from "../../../shared/api/axiosInstance";

type ReplyMode = "TEACHER" | "PARENT";

interface MemberResponse {
  id: number;
  username: string;
  nickname: string;
  replyMode: ReplyMode;
  profileImageUrl: string | null;
}

const UserCard = () => {
  const [member, setMember] = useState<MemberResponse | null>(null);

  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [isEditingReplyMode, setIsEditingReplyMode] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);

  const [newNickname, setNewNickname] = useState("");
  const [newReplyMode, setNewReplyMode] = useState<ReplyMode>("TEACHER");
  const [newImage, setNewImage] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 🔹 프로필 조회 (초기 로드 + 이미지 업로드 후 재조회에서 공용)
  const fetchProfile = async () => {
    const res = await axiosInstance.get("/api/mypage");
    const data = res.data.data;
    setMember(data);
    setNewReplyMode(data.replyMode);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // 🔹 닉네임 수정
  const handleNicknameUpdate = async () => {
    if (!newNickname) return;

    await axiosInstance.put("/api/mypage/nickname", {
      nickname: newNickname,
    });

    setMember((prev) => (prev ? { ...prev, nickname: newNickname } : prev));
    setIsEditingNickname(false);
    setNewNickname("");
  };

  // 🔹 답장모드 수정
  const handleReplyModeUpdate = async () => {
    await axiosInstance.put("/api/mypage/reply-mode", {
      replyMode: newReplyMode,
    });

    setMember((prev) => (prev ? { ...prev, replyMode: newReplyMode } : prev));
    setIsEditingReplyMode(false);
  };

  // 🔹 프로필 이미지 업로드
  const handleImageUpdate = async () => {
    if (!newImage) return;

    const formData = new FormData();
    formData.append("file", newImage);

    await axiosInstance.post("/api/mypage/profile-image", formData);

    await fetchProfile();

    setIsEditingImage(false);
    setNewImage(null);
  };

  if (!member) return <div>로딩중...</div>;

  return (
    <div className="rounded-[24px] border border-[#bfbdbd] p-[45px] shadow-md max-989:p-[20px]">
      {/* 프로필 이미지 */}
      <div className="relative m-auto h-[100px] w-[100px]">
        <div className="relative h-[100px] w-[100px] overflow-hidden rounded-full bg-gray-200">
          {member.profileImageUrl && (
            <img
              src={`${import.meta.env.VITE_API_BASE_URL}${member.profileImageUrl}`}
              alt="profile"
              className="h-full w-full object-cover"
            />
          )}
        </div>

        {/* 카메라 버튼 */}
        {!isEditingImage && (
          <button
            type="button"
            className="absolute bottom-0 right-0 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
            onClick={() => setIsEditingImage(true)}
          >
            📷
          </button>
        )}

        {/* 파일 선택 UI */}
        {isEditingImage && (
          <div className="absolute left-1/2 top-[110%] w-[200px] -translate-x-1/2 rounded-md border bg-white p-3 shadow-md">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setNewImage(e.target.files[0]);
                }
              }}
              className="mb-2 w-full text-sm"
            />

            <button
              onClick={handleImageUpdate}
              className="mb-1 w-full rounded-md bg-black px-3 py-2 text-white"
            >
              저장
            </button>

            <button
              onClick={() => {
                setIsEditingImage(false);
                setNewImage(null);
              }}
              className="w-full rounded-md bg-gray-300 px-3 py-2"
            >
              취소
            </button>
          </div>
        )}
      </div>

      {/* 닉네임 */}
      <h2 className="mb-4 mt-6 text-center text-[22px] font-bold">
        {member.nickname}
        {!isEditingNickname && (
          <button
            className="ml-2 text-gray-500 hover:text-gray-700"
            onClick={() => setIsEditingNickname(true)}
          >
            ✏️
          </button>
        )}
      </h2>

      {/* 닉네임 수정 */}
      {isEditingNickname && (
        <div className="flex flex-col space-y-2">
          <input
            value={newNickname}
            onChange={(e) => setNewNickname(e.target.value)}
            className="rounded-md border px-3 py-2"
            placeholder="새 닉네임"
          />
          <button
            onClick={handleNicknameUpdate}
            className="rounded-md bg-black px-4 py-2 text-white"
          >
            저장
          </button>
          <button
            onClick={() => setIsEditingNickname(false)}
            className="rounded-md bg-gray-300 px-4 py-2"
          >
            취소
          </button>
        </div>
      )}

      {/* 답장 모드 */}
      <div className="mt-6 text-center">
        <p className="font-semibold">답장 모드</p>

        {!isEditingReplyMode ? (
          <>
            <p className="mt-2">
              {member.replyMode === "TEACHER" ? "선생님 모드" : "부모님 모드"}
            </p>
            <button
              className="mt-2 text-sm text-gray-500 underline"
              onClick={() => setIsEditingReplyMode(true)}
            >
              변경
            </button>
          </>
        ) : (
          <div className="mt-3 flex flex-col space-y-2">
            <select
              value={newReplyMode}
              onChange={(e) => setNewReplyMode(e.target.value as ReplyMode)}
              className="rounded-md border px-3 py-2"
            >
              <option value="TEACHER">선생님</option>
              <option value="PARENT">부모님</option>
            </select>
            <button
              onClick={handleReplyModeUpdate}
              className="rounded-md bg-black px-4 py-2 text-white"
            >
              저장
            </button>
            <button
              onClick={() => setIsEditingReplyMode(false)}
              className="rounded-md bg-gray-300 px-4 py-2"
            >
              취소
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
