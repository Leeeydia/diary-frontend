import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem('accessToken');

  const close = () => setOpen(false);

  const handleNav = (path: string) => {
    close();
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    close();
    navigate('/');
  };

  return (
    <>
      {/* 햄버거 버튼 */}
      <button
        onClick={() => setOpen(true)}
        className="flex flex-col gap-1.5 p-2 rounded-md hover:bg-gray-100 transition-colors"
        aria-label="메뉴 열기"
        aria-expanded={open}
      >
        <span className="block w-6 h-0.5 bg-gray-700" />
        <span className="block w-6 h-0.5 bg-gray-700" />
        <span className="block w-6 h-0.5 bg-gray-700" />
      </button>

      {/* 오버레이 — 항상 렌더링, opacity로 토글하여 패널 닫힘 애니메이션과 싱크 */}
      <div
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={close}
      />

      {/* 사이드 패널 */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 패널 헤더 */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
          <span className="font-semibold text-gray-800">메뉴</span>
          <button
            onClick={close}
            className="w-8 h-8 flex items-center justify-center rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="메뉴 닫기"
          >
            ✕
          </button>
        </div>

        {/* 메뉴 항목 */}
        <nav className="flex flex-col mt-2">
          {isLoggedIn ? (
            <>
              <button
                onClick={() => handleNav('/diary')}
                className="text-left px-5 py-3.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                내 일기
              </button>
              <button
                onClick={() => handleNav('/board')}
                className="text-left px-5 py-3.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                게시판
              </button>
              <button
                onClick={() => handleNav('/mypage')}
                className="text-left px-5 py-3.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                마이페이지
              </button>
              <div className="border-t border-gray-100 mt-2 pt-2">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-5 py-3.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  로그아웃
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => handleNav('/login')}
                className="text-left px-5 py-3.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                로그인
              </button>
            </>
          )}
        </nav>
      </div>
    </>
  );
}

export default HamburgerMenu;
