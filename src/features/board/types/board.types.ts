export interface Post {
  id: number;
  title: string;
  content: string;
  emotion: string;
  memberId: number;  // 작성자 ID — 본인 여부 비교에 사용
  nickname: string;  // 작성자 닉네임 — 화면 표시에 사용
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  emotion: string;
}

export interface UpdatePostRequest {
  title?: string;
  content?: string;
  emotion?: string;
}

// GET /api/board 쿼리 파라미터
export interface PostListParams {
  emotion?: string;
  page?: number;
  size?: number;
}

// Spring Boot Page<T> 응답 구조 (페이지네이션 사용 시 보존)
export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number; // 현재 페이지 (0-indexed)
  size: number;
}
