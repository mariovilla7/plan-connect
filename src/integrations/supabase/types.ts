export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      clients: {
        Row: {
          activity_level: string | null
          age: number | null
          budget: string | null
          client_name: string
          cooking_time: string | null
          country: string | null
          created_at: string
          diet_preferences: string[] | null
          email: string | null
          hated_foods: string | null
          height: number | null
          id: string
          loved_foods: string | null
          objective: string | null
          other_restriction: string | null
          pathologies: string[] | null
          phone: string | null
          restrictions: string[] | null
          sex: string | null
          updated_at: string
          user_id: string
          weight: number | null
        }
        Insert: {
          activity_level?: string | null
          age?: number | null
          budget?: string | null
          client_name: string
          cooking_time?: string | null
          country?: string | null
          created_at?: string
          diet_preferences?: string[] | null
          email?: string | null
          hated_foods?: string | null
          height?: number | null
          id?: string
          loved_foods?: string | null
          objective?: string | null
          other_restriction?: string | null
          pathologies?: string[] | null
          phone?: string | null
          restrictions?: string[] | null
          sex?: string | null
          updated_at?: string
          user_id: string
          weight?: number | null
        }
        Update: {
          activity_level?: string | null
          age?: number | null
          budget?: string | null
          client_name?: string
          cooking_time?: string | null
          country?: string | null
          created_at?: string
          diet_preferences?: string[] | null
          email?: string | null
          hated_foods?: string | null
          height?: number | null
          id?: string
          loved_foods?: string | null
          objective?: string | null
          other_restriction?: string | null
          pathologies?: string[] | null
          phone?: string | null
          restrictions?: string[] | null
          sex?: string | null
          updated_at?: string
          user_id?: string
          weight?: number | null
        }
        Relationships: []
      }
      ingredient_equivalences: {
        Row: {
          created_at: string
          equivalences: string[]
          id: string
          ingredient_name: string
        }
        Insert: {
          created_at?: string
          equivalences?: string[]
          id?: string
          ingredient_name: string
        }
        Update: {
          created_at?: string
          equivalences?: string[]
          id?: string
          ingredient_name?: string
        }
        Relationships: []
      }
      meal_images: {
        Row: {
          created_at: string
          id: string
          image_url: string
          meal_name: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          meal_name: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          meal_name?: string
        }
        Relationships: []
      }
      plan_client_assignments: {
        Row: {
          assigned_at: string
          client_id: string
          id: string
          plan_id: string
        }
        Insert: {
          assigned_at?: string
          client_id: string
          id?: string
          plan_id: string
        }
        Update: {
          assigned_at?: string
          client_id?: string
          id?: string
          plan_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "plan_client_assignments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plan_client_assignments_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
        ]
      }
      plans: {
        Row: {
          client_id: string | null
          client_name: string
          config: Json
          created_at: string
          id: string
          pdf_url: string | null
          plan_data: Json
          plan_name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          client_id?: string | null
          client_name: string
          config: Json
          created_at?: string
          id?: string
          pdf_url?: string | null
          plan_data: Json
          plan_name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          client_id?: string | null
          client_name?: string
          config?: Json
          created_at?: string
          id?: string
          pdf_url?: string | null
          plan_data?: Json
          plan_name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "plans_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          ai_credits: number
          country: string | null
          created_at: string
          display_name: string | null
          firebase_uid: string
          id: string
          last_credit_reset: string
          updated_at: string
        }
        Insert: {
          ai_credits?: number
          country?: string | null
          created_at?: string
          display_name?: string | null
          firebase_uid: string
          id?: string
          last_credit_reset?: string
          updated_at?: string
        }
        Update: {
          ai_credits?: number
          country?: string | null
          created_at?: string
          display_name?: string | null
          firebase_uid?: string
          id?: string
          last_credit_reset?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      decrement_ai_credits: {
        Args: { p_firebase_uid: string }
        Returns: undefined
      }
      get_firebase_uid: { Args: never; Returns: string }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
