export interface Member {
  id: number;
  username: string;
  email: string;
  createdAt: string;
}

export interface UpdateMemberRequest {
  email?: string;
  password?: string;
}
