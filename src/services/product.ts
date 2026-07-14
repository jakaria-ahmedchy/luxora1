import axiosInstance from "@/lib/axios";

export async function getProducts() {
  const res = await axiosInstance.get("/api/products");
  return res.data;
}

export async function getProduct(id: string) {
  const res = await axiosInstance.get(`/api/products/${id}`);
  return res.data;
}