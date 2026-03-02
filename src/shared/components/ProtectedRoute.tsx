import { Navigate, Outlet } from 'react-router-dom';

// 토큰이 없으면 /login으로 리다이렉트, 있으면 자식 라우트 렌더링
function ProtectedRoute() {
  const isLoggedIn = !!localStorage.getItem('accessToken');

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
