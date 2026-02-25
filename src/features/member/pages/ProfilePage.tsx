import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMe, updateMe } from '../api/memberApi';
import type { Member } from '../types/member.types';

function ProfilePage() {
  const navigate = useNavigate();
  const [member, setMember] = useState<Member | null>(null);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMe()
      .then((res) => {
        if (res.code === 'SUCCESS') {
          setMember(res.data);
          setEmail(res.data.email);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await updateMe({ email });
    if (res.code === 'SUCCESS') {
      setMessage('정보가 수정되었습니다.');
      setMember(res.data);
    } else {
      setMessage(res.message || '수정에 실패했습니다.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  if (loading) return <p className="p-8 text-center text-gray-500">불러오는 중...</p>;
  if (!member) return <p className="p-8 text-center text-gray-500">정보를 불러올 수 없습니다.</p>;

  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">내 프로필</h1>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <p className="text-sm text-gray-500 mb-1">아이디</p>
        <p className="text-gray-800 font-medium mb-4">{member.username}</p>

        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-500 mb-1">
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            수정하기
          </button>
        </form>

        {message && (
          <p className="mt-3 text-center text-sm text-green-600">{message}</p>
        )}
      </div>

      <button
        onClick={handleLogout}
        className="w-full py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
      >
        로그아웃
      </button>
    </div>
  );
}

export default ProfilePage;
