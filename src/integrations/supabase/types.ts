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
      calendar_appointments: {
        Row: {
          all_day: boolean
          client_id: string | null
          color: string
          created_at: string
          ends_at: string
          firebase_uid: string
          id: string
          location: string | null
          notes: string | null
          plan_id: string | null
          starts_at: string
          title: string
          updated_at: string
        }
        Insert: {
          all_day?: boolean
          client_id?: string | null
          color?: string
          created_at?: string
          ends_at: string
          firebase_uid: string
          id?: string
          location?: string | null
          notes?: string | null
          plan_id?: string | null
          starts_at: string
          title: string
          updated_at?: string
        }
        Update: {
          all_day?: boolean
          client_id?: string | null
          color?: string
          created_at?: string
          ends_at?: string
          firebase_uid?: string
          id?: string
          location?: string | null
          notes?: string | null
          plan_id?: string | null
          starts_at?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "calendar_appointments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calendar_appointments_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
        ]
      }
      calendar_google_connections: {
        Row: {
          account_email: string | null
          connection_key: string
          created_at: string
          firebase_uid: string
          updated_at: string
        }
        Insert: {
          account_email?: string | null
          connection_key: string
          created_at?: string
          firebase_uid: string
          updated_at?: string
        }
        Update: {
          account_email?: string | null
          connection_key?: string
          created_at?: string
          firebase_uid?: string
          updated_at?: string
        }
        Relationships: []
      }
      calendar_sources: {
        Row: {
          color: string
          created_at: string
          firebase_uid: string
          id: string
          is_active: boolean
          kind: string
          last_error: string | null
          last_synced_at: string | null
          name: string
          updated_at: string
          url: string | null
        }
        Insert: {
          color?: string
          created_at?: string
          firebase_uid: string
          id?: string
          is_active?: boolean
          kind: string
          last_error?: string | null
          last_synced_at?: string | null
          name: string
          updated_at?: string
          url?: string | null
        }
        Update: {
          color?: string
          created_at?: string
          firebase_uid?: string
          id?: string
          is_active?: boolean
          kind?: string
          last_error?: string | null
          last_synced_at?: string | null
          name?: string
          updated_at?: string
          url?: string | null
        }
        Relationships: []
      }
      clients: {
        Row: {
          activity_level: string | null
          additional_notes: string | null
          age: number | null
          arm: number | null
          birth_date: string | null
          body_fat_pct: number | null
          budget: string | null
          chest: number | null
          client_name: string
          cooking_time: string | null
          country: string | null
          created_at: string
          custom_diet_preference: string | null
          diet_preferences: string[] | null
          email: string | null
          family_history: string | null
          food_log: Json | null
          hated_foods: string | null
          height: number | null
          hip: number | null
          id: string
          loved_foods: string | null
          muscle_pct: number | null
          neck: number | null
          objective: string | null
          other_objective: string | null
          other_pathology: string | null
          other_restriction: string | null
          pathologies: string[] | null
          phone: string | null
          restrictions: string[] | null
          sex: string | null
          sleep_hours: number | null
          thigh: number | null
          updated_at: string
          user_id: string
          waist: number | null
          water_unit: string | null
          water_value: number | null
          weight: number | null
        }
        Insert: {
          activity_level?: string | null
          additional_notes?: string | null
          age?: number | null
          arm?: number | null
          birth_date?: string | null
          body_fat_pct?: number | null
          budget?: string | null
          chest?: number | null
          client_name: string
          cooking_time?: string | null
          country?: string | null
          created_at?: string
          custom_diet_preference?: string | null
          diet_preferences?: string[] | null
          email?: string | null
          family_history?: string | null
          food_log?: Json | null
          hated_foods?: string | null
          height?: number | null
          hip?: number | null
          id?: string
          loved_foods?: string | null
          muscle_pct?: number | null
          neck?: number | null
          objective?: string | null
          other_objective?: string | null
          other_pathology?: string | null
          other_restriction?: string | null
          pathologies?: string[] | null
          phone?: string | null
          restrictions?: string[] | null
          sex?: string | null
          sleep_hours?: number | null
          thigh?: number | null
          updated_at?: string
          user_id: string
          waist?: number | null
          water_unit?: string | null
          water_value?: number | null
          weight?: number | null
        }
        Update: {
          activity_level?: string | null
          additional_notes?: string | null
          age?: number | null
          arm?: number | null
          birth_date?: string | null
          body_fat_pct?: number | null
          budget?: string | null
          chest?: number | null
          client_name?: string
          cooking_time?: string | null
          country?: string | null
          created_at?: string
          custom_diet_preference?: string | null
          diet_preferences?: string[] | null
          email?: string | null
          family_history?: string | null
          food_log?: Json | null
          hated_foods?: string | null
          height?: number | null
          hip?: number | null
          id?: string
          loved_foods?: string | null
          muscle_pct?: number | null
          neck?: number | null
          objective?: string | null
          other_objective?: string | null
          other_pathology?: string | null
          other_restriction?: string | null
          pathologies?: string[] | null
          phone?: string | null
          restrictions?: string[] | null
          sex?: string | null
          sleep_hours?: number | null
          thigh?: number | null
          updated_at?: string
          user_id?: string
          waist?: number | null
          water_unit?: string | null
          water_value?: number | null
          weight?: number | null
        }
        Relationships: []
      }
      conversion_factors: {
        Row: {
          canonical_name: string
          created_at: string
          factor: number
          id: string
          notes: string | null
        }
        Insert: {
          canonical_name: string
          created_at?: string
          factor: number
          id?: string
          notes?: string | null
        }
        Update: {
          canonical_name?: string
          created_at?: string
          factor?: number
          id?: string
          notes?: string | null
        }
        Relationships: []
      }
      default_entitlements: {
        Row: {
          active: boolean
          product_code: string
        }
        Insert: {
          active?: boolean
          product_code: string
        }
        Update: {
          active?: boolean
          product_code?: string
        }
        Relationships: []
      }
      follow_up_sessions: {
        Row: {
          adherence_score: number | null
          arm: number | null
          bmi: number | null
          chest: number | null
          client_id: string
          created_at: string
          date: string
          fat_percentage: number | null
          hip: number | null
          id: string
          muscle_percentage: number | null
          neck: number | null
          observations: string | null
          subjective_progress: string | null
          thigh: number | null
          updated_at: string
          user_id: string
          waist: number | null
          weight: number | null
        }
        Insert: {
          adherence_score?: number | null
          arm?: number | null
          bmi?: number | null
          chest?: number | null
          client_id: string
          created_at?: string
          date?: string
          fat_percentage?: number | null
          hip?: number | null
          id?: string
          muscle_percentage?: number | null
          neck?: number | null
          observations?: string | null
          subjective_progress?: string | null
          thigh?: number | null
          updated_at?: string
          user_id: string
          waist?: number | null
          weight?: number | null
        }
        Update: {
          adherence_score?: number | null
          arm?: number | null
          bmi?: number | null
          chest?: number | null
          client_id?: string
          created_at?: string
          date?: string
          fat_percentage?: number | null
          hip?: number | null
          id?: string
          muscle_percentage?: number | null
          neck?: number | null
          observations?: string | null
          subjective_progress?: string | null
          thigh?: number | null
          updated_at?: string
          user_id?: string
          waist?: number | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "follow_up_sessions_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      ingredient_dictionary: {
        Row: {
          alias: string
          canonical_name: string
          category: string
          created_at: string
          id: string
        }
        Insert: {
          alias: string
          canonical_name: string
          category?: string
          created_at?: string
          id?: string
        }
        Update: {
          alias?: string
          canonical_name?: string
          category?: string
          created_at?: string
          id?: string
        }
        Relationships: []
      }
      ingredient_equivalences: {
        Row: {
          created_at: string
          equivalences: string[]
          id: string
          ingredient_name: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          equivalences?: string[]
          id?: string
          ingredient_name: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          equivalences?: string[]
          id?: string
          ingredient_name?: string
          user_id?: string | null
        }
        Relationships: []
      }
      master_templates: {
        Row: {
          base_calories: number
          base_macros: Json
          category: string | null
          config: Json | null
          created_at: string
          days: number
          description: string | null
          id: string
          is_global: boolean
          meals: number
          name: string
          plan_data: Json
          tags: string[] | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          base_calories?: number
          base_macros?: Json
          category?: string | null
          config?: Json | null
          created_at?: string
          days?: number
          description?: string | null
          id?: string
          is_global?: boolean
          meals?: number
          name: string
          plan_data: Json
          tags?: string[] | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          base_calories?: number
          base_macros?: Json
          category?: string | null
          config?: Json | null
          created_at?: string
          days?: number
          description?: string | null
          id?: string
          is_global?: boolean
          meals?: number
          name?: string
          plan_data?: Json
          tags?: string[] | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      meal_images: {
        Row: {
          created_at: string
          id: string
          image_url: string
          meal_name: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          meal_name: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          meal_name?: string
          user_id?: string | null
        }
        Relationships: []
      }
      nutrition_methods: {
        Row: {
          country: string | null
          created_at: string
          firebase_uid: string
          id: string
          is_default: boolean
          name: string
          source: string
          structure: Json
          summary: string | null
          updated_at: string
        }
        Insert: {
          country?: string | null
          created_at?: string
          firebase_uid?: string
          id?: string
          is_default?: boolean
          name: string
          source?: string
          structure?: Json
          summary?: string | null
          updated_at?: string
        }
        Update: {
          country?: string | null
          created_at?: string
          firebase_uid?: string
          id?: string
          is_default?: boolean
          name?: string
          source?: string
          structure?: Json
          summary?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      parsed_meals: {
        Row: {
          alternative_group: string | null
          created_at: string
          document_id: string
          id: string
          ingredient: string
          meal: string
          quantity: number
          unit: string
          user_id: string
        }
        Insert: {
          alternative_group?: string | null
          created_at?: string
          document_id: string
          id?: string
          ingredient: string
          meal: string
          quantity: number
          unit: string
          user_id: string
        }
        Update: {
          alternative_group?: string | null
          created_at?: string
          document_id?: string
          id?: string
          ingredient?: string
          meal?: string
          quantity?: number
          unit?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "parsed_meals_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "uploaded_documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "parsed_meals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
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
          mode: string
          options_plan: Json | null
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
          mode?: string
          options_plan?: Json | null
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
          mode?: string
          options_plan?: Json | null
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
          onboarding_status: Json
          share_token: string
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
          onboarding_status?: Json
          share_token?: string
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
          onboarding_status?: Json
          share_token?: string
          updated_at?: string
        }
        Relationships: []
      }
      recipes: {
        Row: {
          calories: number | null
          category: string | null
          cook_time: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          ingredients: string[] | null
          instructions: string[] | null
          name: string
          nutrition: Json | null
          tags: string[] | null
          user_id: string
        }
        Insert: {
          calories?: number | null
          category?: string | null
          cook_time?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          ingredients?: string[] | null
          instructions?: string[] | null
          name: string
          nutrition?: Json | null
          tags?: string[] | null
          user_id: string
        }
        Update: {
          calories?: number | null
          category?: string | null
          cook_time?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          ingredients?: string[] | null
          instructions?: string[] | null
          name?: string
          nutrition?: Json | null
          tags?: string[] | null
          user_id?: string
        }
        Relationships: []
      }
      shopping_list_items: {
        Row: {
          alternative_group: string | null
          alternatives: string[] | null
          canonical_id: string | null
          catalog_version: string | null
          category: string
          confidence: string | null
          cooked_quantity: number
          created_at: string
          deleted_at: string | null
          display_name: string | null
          id: string
          ingredient_name: string
          is_edited: boolean
          purchase_quantity: number
          raw_names: string[] | null
          shopping_list_id: string
          unit: string
          warning_reasons: string[] | null
        }
        Insert: {
          alternative_group?: string | null
          alternatives?: string[] | null
          canonical_id?: string | null
          catalog_version?: string | null
          category?: string
          confidence?: string | null
          cooked_quantity: number
          created_at?: string
          deleted_at?: string | null
          display_name?: string | null
          id?: string
          ingredient_name: string
          is_edited?: boolean
          purchase_quantity: number
          raw_names?: string[] | null
          shopping_list_id: string
          unit: string
          warning_reasons?: string[] | null
        }
        Update: {
          alternative_group?: string | null
          alternatives?: string[] | null
          canonical_id?: string | null
          catalog_version?: string | null
          category?: string
          confidence?: string | null
          cooked_quantity?: number
          created_at?: string
          deleted_at?: string | null
          display_name?: string | null
          id?: string
          ingredient_name?: string
          is_edited?: boolean
          purchase_quantity?: number
          raw_names?: string[] | null
          shopping_list_id?: string
          unit?: string
          warning_reasons?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "shopping_list_items_shopping_list_id_fkey"
            columns: ["shopping_list_id"]
            isOneToOne: false
            referencedRelation: "shopping_lists"
            referencedColumns: ["id"]
          },
        ]
      }
      shopping_lists: {
        Row: {
          created_at: string
          document_id: string | null
          id: string
          lang_detected: string | null
          raw_meals: Json | null
          title: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          document_id?: string | null
          id?: string
          lang_detected?: string | null
          raw_meals?: Json | null
          title?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          document_id?: string | null
          id?: string
          lang_detected?: string | null
          raw_meals?: Json | null
          title?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "shopping_lists_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "uploaded_documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shopping_lists_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          created_at: string
          current_period_end: string | null
          email: string | null
          firebase_uid: string
          id: string
          lifetime: boolean
          plan: string | null
          status: string
          stripe_customer_id: string | null
          trial_ends_at: string
          trial_started_at: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          current_period_end?: string | null
          email?: string | null
          firebase_uid: string
          id?: string
          lifetime?: boolean
          plan?: string | null
          status?: string
          stripe_customer_id?: string | null
          trial_ends_at?: string
          trial_started_at?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          current_period_end?: string | null
          email?: string | null
          firebase_uid?: string
          id?: string
          lifetime?: boolean
          plan?: string | null
          status?: string
          stripe_customer_id?: string | null
          trial_ends_at?: string
          trial_started_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      unmatched_ingredients: {
        Row: {
          created_at: string
          document_id: string | null
          id: string
          lang_detected: string | null
          meal: string | null
          quantity: number | null
          raw_name: string
          shopping_list_id: string | null
          unit: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          document_id?: string | null
          id?: string
          lang_detected?: string | null
          meal?: string | null
          quantity?: number | null
          raw_name: string
          shopping_list_id?: string | null
          unit?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          document_id?: string | null
          id?: string
          lang_detected?: string | null
          meal?: string | null
          quantity?: number | null
          raw_name?: string
          shopping_list_id?: string | null
          unit?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "unmatched_ingredients_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "uploaded_documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "unmatched_ingredients_shopping_list_id_fkey"
            columns: ["shopping_list_id"]
            isOneToOne: false
            referencedRelation: "shopping_lists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "unmatched_ingredients_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      uploaded_documents: {
        Row: {
          created_at: string
          error_message: string | null
          filename: string
          id: string
          mime_type: string
          status: string
          storage_path: string
          user_id: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          filename: string
          id?: string
          mime_type: string
          status?: string
          storage_path: string
          user_id: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          filename?: string
          id?: string
          mime_type?: string
          status?: string
          storage_path?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "uploaded_documents_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_feedback: {
        Row: {
          created_at: string
          id: string
          message: string
          type: string
          user_id: string
          user_name: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          type: string
          user_id: string
          user_name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          type?: string
          user_id?: string
          user_name?: string | null
        }
        Relationships: []
      }
      user_products: {
        Row: {
          active: boolean
          created_at: string
          id: string
          product_code: string
          user_id: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          id?: string
          product_code: string
          user_id: string
        }
        Update: {
          active?: boolean
          created_at?: string
          id?: string
          product_code?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_products_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          display_name: string | null
          email: string | null
          entry_product: string
          firebase_uid: string
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          entry_product?: string
          firebase_uid: string
          id?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          entry_product?: string
          firebase_uid?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      apply_standard_grants: {
        Args: { _include_anon?: boolean; _table: unknown }
        Returns: undefined
      }
      decrement_ai_credits: {
        Args: { p_firebase_uid: string }
        Returns: undefined
      }
      get_firebase_uid: { Args: never; Returns: string }
      get_nutritionist_uid_by_token: {
        Args: { _token: string }
        Returns: string
      }
      has_paid_access: { Args: { _firebase_uid: string }; Returns: boolean }
      is_valid_nutritionist: {
        Args: { _firebase_uid: string }
        Returns: boolean
      }
      is_valid_share_token: {
        Args: { _firebase_uid: string; _share_token: string }
        Returns: boolean
      }
      update_profile_fields: {
        Args: {
          p_country?: string
          p_display_name?: string
          p_firebase_uid: string
          p_onboarding_status?: Json
        }
        Returns: Json
      }
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
