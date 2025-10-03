import api from "../api/api";
import { Tag } from "../types/Tag";

export const tagService = {
  async getAll(): Promise<Tag[]> {
    try {
      const response = await api.get("/tags");
      return response.data;
    } catch (error) {
      throw new Error(
        (error as any).response?.data?.message || (error as Error).message
      );
    }
  },

  async getById(id: string): Promise<Tag | null> {
    try {
      const response = await api.get(`/tags/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        (error as any).response?.data?.message || (error as Error).message
      );
    }
  },

  async create(payload: Omit<Tag, "id" | "created_at">): Promise<Tag> {
    try {
      const response = await api.post(`/tags`, payload);
      return response.data;
    } catch (error) {
      throw new Error(
        (error as any).response?.data?.message || (error as Error).message
      );
    }
  },

  async update(id: string, payload: Tag | null): Promise<Tag> {
    try {
      const response = await api.put(`/tags/${id}`, payload);
      return response.data;
    } catch (error) {
      throw new Error(
        (error as any).response?.data?.message || (error as Error).message
      );
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await api.delete(`/tags/${id}`);
    } catch (error) {
      throw new Error(
        (error as any).response?.data?.message || (error as Error).message
      );
    }
  },
};
