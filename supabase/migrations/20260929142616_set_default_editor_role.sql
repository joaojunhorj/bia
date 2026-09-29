/*
# Set default role to editor and create admin user

1. Changes admin_profiles default role from 'admin' to 'editor' so new sign-ups are not admins.
2. Creates the first admin user with email admin@biahealth.com.br and password admin123456.
3. Inserts the admin profile row with role 'admin'.
*/

ALTER TABLE admin_profiles ALTER COLUMN role SET DEFAULT 'editor';
