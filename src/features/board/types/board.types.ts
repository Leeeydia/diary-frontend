export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostRequest {
  title: string;
  content: string;
}

export interface UpdatePostRequest {
  title?: string;
  content?: string;
}

// GET /api/board 쿼리 파라미터
export interface PostListParams {
  emotion?: string;
  page?: number;
  size?: number;
}

// Spring Boot Page<T> 응답 구조
export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number; // 현재 페이지 (0-indexed)
  size: number;
}
