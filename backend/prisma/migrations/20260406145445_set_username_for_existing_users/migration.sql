-- Backfill username for existing users (use email prefix + unique suffix)
UPDATE "users"
SET "username" = LOWER(
  REGEXP_REPLACE(
    SPLIT_PART(email, '@', 1), 
    '[^a-z0-9]', 
    '-', 
    'g'
  ) || '-' || SUBSTRING(id::text, 1, 6)
)
WHERE "username" IS NULL;

-- Now make username NOT NULL and add unique constraint
ALTER TABLE "users" ALTER COLUMN "username" SET NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS "users_username_key" ON "users"("username");