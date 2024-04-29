import axios from "axios";
import { iconsSearchResponseSchema } from "./schemas";

const api = axios.create({
  baseURL: "http://api.iconify.design",
});

export const searchIcons = async (query: string) => {
  const response = await api.get(`/search?query=${encodeURIComponent(query)}`)

  const data = iconsSearchResponseSchema.parse(response.data).icons;

  return data;
}
