export type Emotion = "HAPPY" | "SAD" | "ANGRY" | "CALM";

export interface Diary {
  id: number;
  content: string;
  emotion: string;
  createdAt: string;
  updatedAt: string;
  nickname: string;
}

export interface CreateDiaryRequest {
  content: string;
  emotion: string;
}

export interface UpdateDiaryRequest {
  content?: string;
  emotion?: string;
}

export interface DiaryReply {
  id: number;
  reply: string;
}
