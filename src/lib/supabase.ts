import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  text: string;
  image_url: string | null;
  stars: number;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type Stat = {
  id: string;
  value: string;
  label: string;
  icon_name: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type Feature = {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type Module = {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};
