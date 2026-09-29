/*
# Create admin profiles and content management tables

## Purpose
This migration creates the full backend for the Bia Health admin panel. It allows an admin user to
manage all dynamic content shown on the public landing page: testimonials, statistics, features,
modules, and FAQs.

## New Tables
1. `admin_profiles` — Links to auth.users and marks a user as admin (role field).
2. `site_testimonials` — Testimonials shown in the testimonial sections (marquee + grid).
3. `site_stats` — Statistics numbers shown in the "Nossos números" section.
4. `site_features` — Feature cards shown in the "Recursos" section.
5. `site_modules` — Additional module cards shown in the "Adicionais" section.
6. `site_faqs` — FAQ items shown in the FAQ accordion section.

## Security
- `admin_profiles`: Only authenticated users can read their own profile.
- All content tables: Public (anon + authenticated) can READ. Only admins can INSERT/UPDATE/DELETE.
  Admin is verified via a SECURITY DEFINER function `is_admin()` that checks admin_profiles.
- RLS enabled on every table.

## Admin Setup
After this migration, you must:
1. Create a user via Supabase Auth (email/password).
2. Insert a row into admin_profiles with that user's ID and role = 'admin'.
*/

-- 1. admin_profiles
CREATE TABLE IF NOT EXISTS admin_profiles (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'editor')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "admin_profiles_select_own" ON admin_profiles;
CREATE POLICY "admin_profiles_select_own" ON admin_profiles
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "admin_profiles_insert_self" ON admin_profiles;
CREATE POLICY "admin_profiles_insert_self" ON admin_profiles
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- 2. site_testimonials
CREATE TABLE IF NOT EXISTS site_testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  text text NOT NULL,
  image_url text,
  stars int NOT NULL DEFAULT 5 CHECK (stars >= 1 AND stars <= 5),
  is_active boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_testimonials ENABLE ROW LEVEL SECURITY;

-- 3. site_stats
CREATE TABLE IF NOT EXISTS site_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  value text NOT NULL,
  label text NOT NULL,
  icon_name text NOT NULL DEFAULT 'Building2',
  is_active boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_stats ENABLE ROW LEVEL SECURITY;

-- 4. site_features
CREATE TABLE IF NOT EXISTS site_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  icon_name text NOT NULL DEFAULT 'CalendarDays',
  is_active boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_features ENABLE ROW LEVEL SECURITY;

-- 5. site_modules
CREATE TABLE IF NOT EXISTS site_modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  icon_name text NOT NULL DEFAULT 'FileSignature',
  is_active boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_modules ENABLE ROW LEVEL SECURITY;

-- 6. site_faqs
CREATE TABLE IF NOT EXISTS site_faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_faqs ENABLE ROW LEVEL SECURITY;

-- Helper function: is_admin()
-- SECURITY DEFINER so it can bypass RLS on admin_profiles for the check.
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM admin_profiles
    WHERE user_id = auth.uid() AND role = 'admin'
  );
$$;

GRANT EXECUTE ON FUNCTION is_admin() TO authenticated, anon;

-- Policies for content tables: public read, admin-only write

-- site_testimonials
DROP POLICY IF EXISTS "testimonials_public_read" ON site_testimonials;
CREATE POLICY "testimonials_public_read" ON site_testimonials
  FOR SELECT TO anon, authenticated
  USING (is_active = true);

DROP POLICY IF EXISTS "testimonials_admin_insert" ON site_testimonials;
CREATE POLICY "testimonials_admin_insert" ON site_testimonials
  FOR INSERT TO authenticated
  WITH CHECK (is_admin());

DROP POLICY IF EXISTS "testimonials_admin_update" ON site_testimonials;
CREATE POLICY "testimonials_admin_update" ON site_testimonials
  FOR UPDATE TO authenticated
  USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "testimonials_admin_delete" ON site_testimonials;
CREATE POLICY "testimonials_admin_delete" ON site_testimonials
  FOR DELETE TO authenticated
  USING (is_admin());

-- site_stats
DROP POLICY IF EXISTS "stats_public_read" ON site_stats;
CREATE POLICY "stats_public_read" ON site_stats
  FOR SELECT TO anon, authenticated
  USING (is_active = true);

DROP POLICY IF EXISTS "stats_admin_insert" ON site_stats;
CREATE POLICY "stats_admin_insert" ON site_stats
  FOR INSERT TO authenticated
  WITH CHECK (is_admin());

DROP POLICY IF EXISTS "stats_admin_update" ON site_stats;
CREATE POLICY "stats_admin_update" ON site_stats
  FOR UPDATE TO authenticated
  USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "stats_admin_delete" ON site_stats;
CREATE POLICY "stats_admin_delete" ON site_stats
  FOR DELETE TO authenticated
  USING (is_admin());

-- site_features
DROP POLICY IF EXISTS "features_public_read" ON site_features;
CREATE POLICY "features_public_read" ON site_features
  FOR SELECT TO anon, authenticated
  USING (is_active = true);

DROP POLICY IF EXISTS "features_admin_insert" ON site_features;
CREATE POLICY "features_admin_insert" ON site_features
  FOR INSERT TO authenticated
  WITH CHECK (is_admin());

DROP POLICY IF EXISTS "features_admin_update" ON site_features;
CREATE POLICY "features_admin_update" ON site_features
  FOR UPDATE TO authenticated
  USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "features_admin_delete" ON site_features;
CREATE POLICY "features_admin_delete" ON site_features
  FOR DELETE TO authenticated
  USING (is_admin());

-- site_modules
DROP POLICY IF EXISTS "modules_public_read" ON site_modules;
CREATE POLICY "modules_public_read" ON site_modules
  FOR SELECT TO anon, authenticated
  USING (is_active = true);

DROP POLICY IF EXISTS "modules_admin_insert" ON site_modules;
CREATE POLICY "modules_admin_insert" ON site_modules
  FOR INSERT TO authenticated
  WITH CHECK (is_admin());

DROP POLICY IF EXISTS "modules_admin_update" ON site_modules;
CREATE POLICY "modules_admin_update" ON site_modules
  FOR UPDATE TO authenticated
  USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "modules_admin_delete" ON site_modules;
CREATE POLICY "modules_admin_delete" ON site_modules
  FOR DELETE TO authenticated
  USING (is_admin());

-- site_faqs
DROP POLICY IF EXISTS "faqs_public_read" ON site_faqs;
CREATE POLICY "faqs_public_read" ON site_faqs
  FOR SELECT TO anon, authenticated
  USING (is_active = true);

DROP POLICY IF EXISTS "faqs_admin_insert" ON site_faqs;
CREATE POLICY "faqs_admin_insert" ON site_faqs
  FOR INSERT TO authenticated
  WITH CHECK (is_admin());

DROP POLICY IF EXISTS "faqs_admin_update" ON site_faqs;
CREATE POLICY "faqs_admin_update" ON site_faqs
  FOR UPDATE TO authenticated
  USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "faqs_admin_delete" ON site_faqs;
CREATE POLICY "faqs_admin_delete" ON site_faqs
  FOR DELETE TO authenticated
  USING (is_admin());

-- Indexes for sort_order on all content tables
CREATE INDEX IF NOT EXISTS idx_testimonials_sort ON site_testimonials(sort_order);
CREATE INDEX IF NOT EXISTS idx_stats_sort ON site_stats(sort_order);
CREATE INDEX IF NOT EXISTS idx_features_sort ON site_features(sort_order);
CREATE INDEX IF NOT EXISTS idx_modules_sort ON site_modules(sort_order);
CREATE INDEX IF NOT EXISTS idx_faqs_sort ON site_faqs(sort_order);
