// import { supabase } from "../lib/supabaseClient";
// import { User } from "../types/User";

// const table = "users";

// export const userService = {
//   async getAll(): Promise<User[]> {
//     const { data, error } = await supabase.from<User>(table).select("*");

//     if (error) throw new Error(error.message);
//     return data ?? [];
//   },

//   async getById(id: string): Promise<User | null> {
//     const { data, error } = await supabase
//       .from<User>(table)
//       .select("*")
//       .eq("id", id)
//       .single();

//     if (error) throw new Error(error.message);
//     return data;
//   },

//   async create(payload: Omit<User, "id" | "created_at">): Promise<User> {
//     const { data, error } = await supabase
//       .from<User>(table)
//       .insert(payload)
//       .select()
//       .single();

//     if (error) throw new Error(error.message);
//     return data;
//   },

//   async update(id: string, payload: Partial<User>): Promise<User> {
//     const { data, error } = await supabase
//       .from<User>(table)
//       .update(payload)
//       .eq("id", id)
//       .select()
//       .single();

//     if (error) throw new Error(error.message);
//     return data;
//   },

//   async delete(id: string): Promise<void> {
//     const { error } = await supabase.from<User>(table).delete().eq("id", id);

//     if (error) throw new Error(error.message);
//   },
// };
