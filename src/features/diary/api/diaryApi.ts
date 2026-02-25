import axiosInstance from '../../../shared/api/axiosInstance';
import type { ApiResponse } from '../../../shared/types/api.types';
import type { Diary, CreateDiaryRequest, UpdateDiaryRequest } from '../types/diary.types';

export const getDiaries = async (): Promise<ApiResponse<Diary[]>> => {
  const { data } = await axiosInstance.get<ApiResponse<Diary[]>>('/api/diary');
  return data;
};

export const getDiary = async (id: number): Promise<ApiResponse<Diary>> => {
  const { data } = await axiosInstance.get<ApiResponse<Diary>>(`/api/diary/${id}`);
  return data;
};

export const createDiary = async (body: CreateDiaryRequest): Promise<ApiResponse<Diary>> => {
  const { data } = await axiosInstance.post<ApiResponse<Diary>>('/api/diary', body);
  return data;
};

export const updateDiary = async (id: number, body: UpdateDiaryRequest): Promise<ApiResponse<Diary>> => {
  const { data } = await axiosInstance.put<ApiResponse<Diary>>(`/api/diary/${id}`, body);
  return data;
};

export const deleteDiary = async (id: number): Promise<ApiResponse> => {
  const { data } = await axiosInstance.delete<ApiResponse>(`/api/diary/${id}`);
  return data;
};
