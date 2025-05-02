import { toast } from "sonner";
import { supabase } from "../lib/supabaseClient";
import { Task } from "../types/Task";

const table = "task";

export const taskService = {
  async getAll(): Promise<Task[]> {
    const { data, error } = await supabase.from(table).select("*");
    if (error) toast.error(error.message);
    return data ?? [];
  },

  async getByIdUser(id: string): Promise<Task | null> {
    const { data, error } = await supabase
      .from(table)
      .select.eq("created_by", id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async getById(id: string): Promise<Task | null> {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async create(payload: Omit<Task, "id" | "created_at">): Promise<Task> {
    const { data, error } = await supabase
      .from(table)
      .insert(payload)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async update(id: string, payload: Task | null): Promise<Task> {
    const { data, error } = await supabase
      .from(table)
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from(table).delete().eq("id", id);

    if (error) throw new Error(error.message);
  },
};
