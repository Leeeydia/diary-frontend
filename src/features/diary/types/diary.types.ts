export type Emotion = 'HAPPY' | 'SAD' | 'ANGRY' | 'TIRED';

export interface Diary {
  id: number;
  content: string;
  emotion: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDiaryRequest {
  content: string;
  emotion: string;
}

export interface UpdateDiaryRequest {
  content?: string;
  emotion?: string;
}
