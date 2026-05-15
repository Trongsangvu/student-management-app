import { API_ENDPOINTS } from "@/constants/endpoints";
import { apiFetch } from "@/lib/api-fetch";
import { generateQueryString } from "@/lib/utils";

export const scoreService = {
  async getAll(params: Record<string, string>) {
    const queryString = generateQueryString(params);
    const url = `${API_ENDPOINTS.scores}?${queryString}`;

    return apiFetch(url);
  },

  async getById(id: string) {
    const url = `${API_ENDPOINTS.scores}/${id}`;
    return apiFetch(url);
  },

  async create(data: Record<string, [string]>) {
    const url = API_ENDPOINTS.scores;
    return apiFetch(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async update(id: string, data: Record<string, [string]>) {
    const url = `${API_ENDPOINTS.scores}/${id}`;
    return apiFetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async delete(id: string) {
    const url = `${API_ENDPOINTS.scores}/${id}`;
    return apiFetch(url, {
      method: "DELETE",
    });
  }
};