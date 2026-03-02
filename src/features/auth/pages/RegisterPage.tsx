import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { register } from "../api/authApi";

function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    nickname: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [message, setMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    if (form.password !== form.passwordConfirm) {
      setIsSuccess(false);
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    setLoading(true);

    try {
      const result = await register({
        username: form.username,
        password: form.password,
        email: form.email,
        nickname: form.nickname,
      });

      if (result.code === "SUCCESS") {
        setIsSuccess(true);
        setMessage(result.message ?? "회원가입에 성공했습니다.");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setIsSuccess(false);
        setMessage(result.message ?? "회원가입에 실패했습니다.");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const serverMessage =
          (error.response?.data as { message?: string })?.message ??
          "서버와 통신 중 오류가 발생했습니다.";
        setIsSuccess(false);
        setMessage(serverMessage);
      } else {
        setIsSuccess(false);
        setMessage("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          회원가입
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* 아이디 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              아이디
            </label>
            <input
              name="username"
              type="text"
              required
              value={form.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500"
            />
          </div>

          {/* 닉네임 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              닉네임
            </label>
            <input
              name="nickname"
              type="text"
              required
              value={form.nickname}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500"
            />
          </div>

          {/* 이메일 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이메일
            </label>
            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500"
            />
          </div>

          {/* 비밀번호 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              비밀번호
            </label>
            <input
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500"
            />
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              비밀번호 확인
            </label>
            <input
              name="passwordConfirm"
              type="password"
              required
              value={form.passwordConfirm}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 disabled:bg-gray-400"
          >
            {loading ? "처리 중..." : "회원가입"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center text-sm font-medium ${
              isSuccess ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <p className="mt-4 text-center text-sm text-gray-600">
          이미 계정이 있으신가요?{" "}
          <Link to="/login" className="text-gray-800 hover:underline">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
