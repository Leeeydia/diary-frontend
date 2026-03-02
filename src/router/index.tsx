import { createBrowserRouter } from "react-router-dom";

import HomePage from "../features/home/pages/HomePage";

import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";

import DiaryListPage from "../features/diary/pages/DiaryListPage";
import DiaryDetailPage from "../features/diary/pages/DiaryDetailPage";
import DiaryWritePage from "../features/diary/pages/DiaryWritePage";

import BoardListPage from "../features/board/pages/BoardListPage";
import BoardDetailPage from "../features/board/pages/BoardDetailPage";
import BoardWritePage from "../features/board/pages/BoardWritePage";

import ProfilePage from "../features/member/pages/ProfilePage";
import ProtectedRoute from "../shared/components/ProtectedRoute";

const router = createBrowserRouter([
  // 기본 진입점
  { path: "/", element: <HomePage /> },

  // auth
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },

  // write
  { path: "/write", element: <DiaryWritePage /> },

  // diary
  { path: "/diary", element: <DiaryListPage /> },
  { path: "/diary/:id", element: <DiaryDetailPage /> },
  { path: "/diary/:id/edit", element: <DiaryWritePage /> },

  // board — 로그인 필수 (ProtectedRoute가 토큰 없으면 /login으로 리다이렉트)
  {
    element: <ProtectedRoute />,
    children: [
      { path: "/board", element: <BoardListPage /> },
      { path: "/board/new", element: <BoardWritePage /> },
      { path: "/board/:id", element: <BoardDetailPage /> },
      { path: "/board/:id/edit", element: <BoardWritePage /> },
    ],
  },

  // member
  { path: "/mypage", element: <ProfilePage /> },
]);

export default router;
