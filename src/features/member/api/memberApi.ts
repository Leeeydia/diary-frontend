import axiosInstance from '../../../shared/api/axiosInstance';
import type { ApiResponse } from '../../../shared/types/api.types';
import type { Member, UpdateMemberRequest } from '../types/member.types';

export const getMe = async (): Promise<ApiResponse<Member>> => {
  const { data } = await axiosInstance.get<ApiResponse<Member>>('/api/member/me');
  return data;
};

export const updateMe = async (body: UpdateMemberRequest): Promise<ApiResponse<Member>> => {
  const { data } = await axiosInstance.put<ApiResponse<Member>>('/api/member/me', body);
  return data;
};

export const deleteMe = async (): Promise<ApiResponse> => {
  const { data } = await axiosInstance.delete<ApiResponse>('/api/member/me');
  return data;
};
