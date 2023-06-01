export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number;
          checksum: string;
          finished_at: string | null;
          id: string;
          logs: string | null;
          migration_name: string;
          rolled_back_at: string | null;
          started_at: string;
        };
        Insert: {
          applied_steps_count?: number;
          checksum: string;
          finished_at?: string | null;
          id: string;
          logs?: string | null;
          migration_name: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Update: {
          applied_steps_count?: number;
          checksum?: string;
          finished_at?: string | null;
          id?: string;
          logs?: string | null;
          migration_name?: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
      };
      countries: {
        Row: {
          id: number;
          iso3166Alpha2: string;
          name: string;
        };
        Insert: {
          id?: number;
          iso3166Alpha2: string;
          name: string;
        };
        Update: {
          id?: number;
          iso3166Alpha2?: string;
          name?: string;
        };
      };
      profiles: {
        Row: {
          addr1: string | null;
          addr2: string | null;
          city: string | null;
          country_id: number | null;
          email: string;
          first_name: string | null;
          id: string;
          last_name: string | null;
          phone: string | null;
          post_code: string | null;
          state: string | null;
        };
        Insert: {
          addr1?: string | null;
          addr2?: string | null;
          city?: string | null;
          country_id?: number | null;
          email: string;
          first_name?: string | null;
          id: string;
          last_name?: string | null;
          phone?: string | null;
          post_code?: string | null;
          state?: string | null;
        };
        Update: {
          addr1?: string | null;
          addr2?: string | null;
          city?: string | null;
          country_id?: number | null;
          email?: string;
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
          phone?: string | null;
          post_code?: string | null;
          state?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type PrismaMigration =
  Database["public"]["Tables"]["_prisma_migrations"]["Row"];
export type InsertPrismaMigration =
  Database["public"]["Tables"]["_prisma_migrations"]["Insert"];
export type UpdatePrismaMigration =
  Database["public"]["Tables"]["_prisma_migrations"]["Update"];

export type Country = Database["public"]["Tables"]["countries"]["Row"];
export type InsertCountry = Database["public"]["Tables"]["countries"]["Insert"];
export type UpdateCountry = Database["public"]["Tables"]["countries"]["Update"];

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type InsertProfile = Database["public"]["Tables"]["profiles"]["Insert"];
export type UpdateProfile = Database["public"]["Tables"]["profiles"]["Update"];
