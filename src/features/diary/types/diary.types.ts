export interface Diary {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDiaryRequest {
  title: string;
  content: string;
  emotion: string;
}

export interface UpdateDiaryRequest {
  title?: string;
  content?: string;
}
