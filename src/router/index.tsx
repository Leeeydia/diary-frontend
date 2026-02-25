import { createBrowserRouter } from 'react-router-dom';

import HomePage from '../features/home/pages/HomePage';

import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';

import DiaryListPage from '../features/diary/pages/DiaryListPage';
import DiaryDetailPage from '../features/diary/pages/DiaryDetailPage';

import BoardListPage from '../features/board/pages/BoardListPage';
import BoardDetailPage from '../features/board/pages/BoardDetailPage';

import ProfilePage from '../features/member/pages/ProfilePage';

const router = createBrowserRouter([
  // 기본 진입점
  { path: '/', element: <HomePage /> },

  // auth
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },

  // diary
  { path: '/diary', element: <DiaryListPage /> },
  { path: '/diary/:id', element: <DiaryDetailPage /> },

  // board
  { path: '/board', element: <BoardListPage /> },
  { path: '/board/:id', element: <BoardDetailPage /> },

  // member
  { path: '/profile', element: <ProfilePage /> },
]);

export default router;
