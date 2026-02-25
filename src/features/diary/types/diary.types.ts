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
}

export interface UpdateDiaryRequest {
  title?: string;
  content?: string;
}
