import api from "../api/api";
import { Project } from "../types/Project";

export const projectService = {
  async getAll(): Promise<Project[]> {
    try {
      const response = await api.get("/projects");
      return response.data;
    } catch (error) {
      throw new Error(
        (error as any).response?.data?.message || (error as Error).message
      );
    }
  },

  async getByIdUser(id: string | undefined): Promise<Project[] | null> {
    try {
      const response = await api.get(`/projects`, {
        params: { created_by: id },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        (error as any).response?.data?.message || (error as Error).message
      );
    }
  },

  async getByName(
    id: string | undefined,
    name: string
  ): Promise<Project[] | null> {
    try {
      const response = await api.get(`/projects`, {
        params: { created_by: id, name },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        (error as any).response?.data?.message || (error as Error).message
      );
    }
  },

  async getById(id: string): Promise<Project | null> {
    try {
      const response = await api.get(`/projects/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        (error as any).response?.data?.message || (error as Error).message
      );
    }
  },

  async create(payload: Omit<Project, "id" | "created_at">): Promise<Project> {
    try {
      const response = await api.post(`/projects`, payload);
      return response.data;
    } catch (error) {
      throw new Error(
        (error as any).response?.data?.message || (error as Error).message
      );
    }
  },

  async update(id: string, payload: Project | null): Promise<Project> {
    try {
      const response = await api.put(`/projects/${id}`, payload);
      return response.data;
    } catch (error) {
      throw new Error(
        (error as any).response?.data?.message || (error as Error).message
      );
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await api.delete(`/projects/${id}`);
    } catch (error) {
      throw new Error(
        (error as any).response?.data?.message || (error as Error).message
      );
    }
  },
};
