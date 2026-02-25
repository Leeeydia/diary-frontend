import axiosInstance from '../../../shared/api/axiosInstance';
import type { ApiResponse } from '../../../shared/types/api.types';
import type { Post, CreatePostRequest, UpdatePostRequest } from '../types/board.types';

export const getPosts = async (): Promise<ApiResponse<Post[]>> => {
  const { data } = await axiosInstance.get<ApiResponse<Post[]>>('/api/board');
  return data;
};

export const getPost = async (id: number): Promise<ApiResponse<Post>> => {
  const { data } = await axiosInstance.get<ApiResponse<Post>>(`/api/board/${id}`);
  return data;
};

export const createPost = async (body: CreatePostRequest): Promise<ApiResponse<Post>> => {
  const { data } = await axiosInstance.post<ApiResponse<Post>>('/api/board', body);
  return data;
};

export const updatePost = async (id: number, body: UpdatePostRequest): Promise<ApiResponse<Post>> => {
  const { data } = await axiosInstance.put<ApiResponse<Post>>(`/api/board/${id}`, body);
  return data;
};

export const deletePost = async (id: number): Promise<ApiResponse> => {
  const { data } = await axiosInstance.delete<ApiResponse>(`/api/board/${id}`);
  return data;
};
