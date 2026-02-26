import { useNavigate } from 'react-router-dom';
import logo from '../../assets/DearSun2.svg';
import HamburgerMenu from '../../features/home/components/HamburgerMenu';

function Header() {
  const navigate = useNavigate();

  return (
    <header className="w-full border-b border-gray-100 bg-white">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-12 py-4 flex justify-between items-center">
        <img
          src={logo}
          alt="DearSun 로고"
          className="h-8 cursor-pointer"
          onClick={() => navigate('/')}
        />
        <HamburgerMenu />
      </div>
    </header>
  );
}

export default Header;
