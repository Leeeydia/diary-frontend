import axiosInstance from '../../../shared/api/axiosInstance';
import type { ApiResponse } from '../../../shared/types/api.types';
import type { LoginRequest, LoginResponse, RegisterRequest } from '../types/auth.types';

export const login = async (body: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
  const { data } = await axiosInstance.post<ApiResponse<LoginResponse>>('/api/auth/login', body);
  return data;
};

export const register = async (body: RegisterRequest): Promise<ApiResponse> => {
  const { data } = await axiosInstance.post<ApiResponse>('/api/auth/register', body);
  return data;
};

export const logout = async (): Promise<ApiResponse> => {
  const { data } = await axiosInstance.post<ApiResponse>('/api/auth/logout');
  return data;
};
