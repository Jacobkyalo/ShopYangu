import { apiUrl } from "../axios";
import { Shop } from "../interfaces";

export const getShops = async (): Promise<Shop[]> => {
  const { data } = await apiUrl.get("/shops");
  return data;
};

export const getShop = async (id: string | number): Promise<Shop> => {
  const { data } = await apiUrl.get(`/shops/${id}`);
  return data;
};

export const deleteShop = async (id: string | number): Promise<Shop> => {
  const { data } = await apiUrl.delete(`/shops/${id}`);
  return data;
};
