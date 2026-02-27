import { useEffect, useState } from "react";
import axiosInstance from "../../../shared/api/axiosInstance";

type ReplyMode = "TEACHER" | "PARENT";

interface MemberResponse {
  id: number;
  username: string;
  replyMode: ReplyMode;
  profileImageUrl: string | null;
}

const UserCard = () => {
  const [member, setMember] = useState<MemberResponse | null>(null);

  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingReplyMode, setIsEditingReplyMode] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);

  const [newUsername, setNewUsername] = useState("");
  const [newReplyMode, setNewReplyMode] = useState<ReplyMode>("TEACHER");
  const [newImage, setNewImage] = useState<File | null>(null);

  // 🔹 1. 프로필 조회
  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axiosInstance.get("/api/mypage");
      const data = res.data.data;

      setMember(data);
      setNewReplyMode(data.replyMode);
    };

    fetchProfile();
  }, []);

  // 🔹 2. 닉네임 수정 (PUT)
  const handleUsernameUpdate = async () => {
    if (!newUsername) return;

    await axiosInstance.put("/api/mypage/username", {
      username: newUsername,
    });

    setMember((prev) => (prev ? { ...prev, username: newUsername } : prev));

    setIsEditingUsername(false);
    setNewUsername("");
  };

  // 🔹 3. 답장모드 수정 (PUT)
  const handleReplyModeUpdate = async () => {
    await axiosInstance.put("/api/mypage/reply-mode", {
      replyMode: newReplyMode,
    });

    setMember((prev) => (prev ? { ...prev, replyMode: newReplyMode } : prev));

    setIsEditingReplyMode(false);
  };

  // 🔹 4. 프로필 이미지 수정 (POST)
  const handleImageUpdate = async () => {
    if (!newImage) return;

    const formData = new FormData();
    formData.append("file", newImage);

    const res = await axiosInstance.post(
      "/api/mypage/profile-image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    setMember((prev) =>
      prev ? { ...prev, profileImageUrl: res.data.data } : prev,
    );

    setIsEditingImage(false);
  };

  if (!member) return <div>로딩중...</div>;

  return (
    <div className="rounded-[24px] border border-[#bfbdbd] p-[45px] shadow-md max-989:p-[20px]">
      {/* 🔹 프로필 이미지 */}
      <div className="relative m-auto h-[100px] w-[100px]">
        <div className="relative h-[100px] w-[100px] overflow-hidden rounded-full bg-gray-200">
          {member.profileImageUrl && (
            <img
              src={member.profileImageUrl}
              alt="profile"
              className="h-full w-full object-cover"
            />
          )}
        </div>

        {!isEditingImage && (
          <button
            className="absolute bottom-0 right-0 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
            onClick={() => setIsEditingImage(true)}
          >
            📷
          </button>
        )}
      </div>

      {isEditingImage && (
        <div className="mt-4 flex flex-col space-y-2">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewImage(e.target.files?.[0] ?? null)}
          />
          <button
            onClick={handleImageUpdate}
            className="rounded-md bg-black px-4 py-2 text-white"
          >
            저장
          </button>
          <button
            onClick={() => setIsEditingImage(false)}
            className="rounded-md bg-gray-300 px-4 py-2"
          >
            취소
          </button>
        </div>
      )}

      {/* 🔹 닉네임 */}
      <h2 className="mb-4 mt-6 text-center text-[22px] font-bold">
        {member.username}
        {!isEditingUsername && (
          <button
            className="ml-2 text-gray-500 hover:text-gray-700"
            onClick={() => setIsEditingUsername(true)}
          >
            ✏️
          </button>
        )}
      </h2>

      {isEditingUsername && (
        <div className="flex flex-col space-y-2">
          <input
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className="rounded-md border px-3 py-2"
            placeholder="새 닉네임"
          />
          <button
            onClick={handleUsernameUpdate}
            className="rounded-md bg-black px-4 py-2 text-white"
          >
            저장
          </button>
          <button
            onClick={() => setIsEditingUsername(false)}
            className="rounded-md bg-gray-300 px-4 py-2"
          >
            취소
          </button>
        </div>
      )}

      {/* 🔹 답장 모드 */}
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
