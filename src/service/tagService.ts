import { supabase } from "../lib/supabaseClient";
import { Tag } from "../types/Tag";

const table = "tag";

export const tagService = {
  async getAllByIdUser(id: string | undefined): Promise<Tag[] | null> {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq("created_by", id);
    if (error) throw new Error(error.message);
    return data;
  },

  async getById(id: string): Promise<Tag | null> {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async create(payload: Omit<Tag, "id" | "created_at">): Promise<Tag> {
    const { data, error } = await supabase
      .from(table)
      .insert(payload)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async update(id: string, payload: Tag | null): Promise<Tag> {
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
