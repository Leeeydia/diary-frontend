import axiosInstance from "../../../shared/api/axiosInstance";
import axios from "axios";
import type { ApiResponse } from "../../../shared/types/api.types";
import type {
  Diary,
  CreateDiaryRequest,
  UpdateDiaryRequest,
  DiaryReply,
} from "../types/diary.types";

export const getDiaries = async (
  emotion?: string,
): Promise<ApiResponse<Diary[]>> => {
  const params = emotion ? { emotion } : {};
  const { data } = await axiosInstance.get<ApiResponse<Diary[]>>("/api/diary", {
    params,
  });
  return data;
};

export const getDiary = async (id: number): Promise<ApiResponse<Diary>> => {
  const { data } = await axiosInstance.get<ApiResponse<Diary>>(
    `/api/diary/${id}`,
  );
  return data;
};

export const createDiary = async (
  body: CreateDiaryRequest,
): Promise<ApiResponse<Diary>> => {
  const { data } = await axiosInstance.post<ApiResponse<Diary>>(
    "/api/diary",
    body,
  );
  return data;
};

export const updateDiary = async (
  id: number,
  body: UpdateDiaryRequest,
): Promise<ApiResponse<Diary>> => {
  const { data } = await axiosInstance.put<ApiResponse<Diary>>(
    `/api/diary/${id}`,
    body,
  );
  return data;
};

export const deleteDiary = async (id: number): Promise<ApiResponse<void>> => {
  const { data } = await axiosInstance.delete<ApiResponse<void>>(
    `/api/diary/${id}`,
  );
  return data;
};

export const getDiaryReply = async (
  id: number,
): Promise<ApiResponse<DiaryReply | null>> => {
  try {
    const { data } = await axiosInstance.get<ApiResponse<DiaryReply>>(
      `/api/diary/${id}/reply`,
    );
    return data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 404) {
      // 🔥 AI 답변이 없는 정상 케이스
      return {
        status: 200,
        code: "SUCCESS",
        message: "",
        data: null,
      };
    }
    throw err;
  }
};

export const createDiaryReply = async (
  id: number,
): Promise<ApiResponse<DiaryReply>> => {
  const { data } = await axiosInstance.post<ApiResponse<DiaryReply>>(
    `/api/diary/${id}/reply`,
  );
  return data;
};
