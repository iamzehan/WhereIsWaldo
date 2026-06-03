import { env } from "../config/env";

export const registerUser = async (
  username: string,
  email: string,
  password: string,
): Promise<{ id: string; username: string }> => {
  const res = await fetch(`${env.VITE_BACKEND_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    // forward backend error properly
    throw {
      status: res.status,
      data,
    };
  }

  return data;
};

interface AccessTokenType {
  accessToken: string;
}
export const fetchProfile = async (data: AccessTokenType) => {
  const meRes = await fetch(`${env.VITE_BACKEND_URL}/api/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${data.accessToken}`,
    },
  });
  return meRes;
};

interface LoginCredentials {
  email: string;
  password: string;
}

export const fetchLogin = async (credentials: LoginCredentials) => {
  const loginRes = await fetch(`${env.VITE_BACKEND_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(credentials),
  });
  return loginRes;
};

export const fetchRefresh = async () => {
  const refreshRes = await fetch(`${env.VITE_BACKEND_URL}/api/auth/refresh`, {
    method: "POST",
    credentials: "include", // 🔑 important for HttpOnly cookies
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
  return refreshRes;
};

export const fetchLogout = async () => {
  await fetch(`${env.VITE_BACKEND_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
};
