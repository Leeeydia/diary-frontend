const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ResultData<T = unknown> {
  status: number;
  code: string;
  message: string;
  data: T;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
}

export async function register(body: RegisterRequest): Promise<ResultData> {
  const response = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data: ResultData = await response.json();
  return data;
}
