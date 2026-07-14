import axiosInstance from "@/lib/axios";

export async function login(data: {
  email: string;
  password: string;
}) {
  const res = await axiosInstance.post("/api/auth/login", data);
  return res.data;
}

export async function register(data: {
  name: string;
  email: string;
  password: string;
}) {
  const res = await axiosInstance.post("/api/auth/register", data);
  return res.data;
}