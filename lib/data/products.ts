import { apiUrl } from "../axios";
import { Product } from "../interfaces";

export const getProducts = async (): Promise<Product[]> => {
  const { data } = await apiUrl.get("/products");
  return data;
};

export const getProduct = async (id: string | number): Promise<Product> => {
  const { data } = await apiUrl.get(`/products/${id}`);
  return data;
};

export const deleteProduct = async (id: string | number): Promise<Product> => {
  const { data } = await apiUrl.delete(`/products/${id}`);
  return data;
};
