export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      Blogs: {
        Row: {
          content: string | null;
          created_at: string;
          id: string;
          title: string | null;
          user_id: string;
          likes: number | null;
        };
        Insert: {
          content?: string | null;
          created_at?: string;
          id?: string;
          title?: string | null;
          user_id: string;
          likes: number | null;
        };
        Update: {
          content?: string | null;
          created_at?: string;
          id?: string;
          title?: string | null;
          user_id?: string;
          likes?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "Blogs_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      comments: {
        Row: {
          content: string;
          created_at: string;
          id: number;
          post_id: string;
          user_id: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: number;
          post_id: string;
          user_id: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: number;
          post_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "Blogs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "comments_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      Likes: {
        Row: {
          created_at: string;
          id: number;
          post_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          post_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          post_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Likes_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "Blogs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Likes_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      profiles: {
        Row: {
          description: string | null;
          id: string;
          email: string | null;
          username: string;
        };
        Insert: {
          description?: string | null;
          id?: string;
          email?: string | null;
          username: string;
        };
        Update: {
          description?: string | null;
          id?: string;
          email?: string | null;
          username?: string;
        };
        Relationships: [];
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
