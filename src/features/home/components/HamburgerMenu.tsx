import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex flex-col gap-1.5 p-2 rounded-md hover:bg-gray-100 transition-colors"
        aria-label="메뉴 열기"
        aria-expanded={open}
      >
        <span className="block w-6 h-0.5 bg-gray-700" />
        <span className="block w-6 h-0.5 bg-gray-700" />
        <span className="block w-6 h-0.5 bg-gray-700" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
          <Link
            to="/login"
            className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={() => setOpen(false)}
          >
            로그인
          </Link>
          <Link
            to="/support"
            className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={() => setOpen(false)}
          >
            고객센터
          </Link>
        </div>
      )}
    </div>
  );
}

export default HamburgerMenu;
