-- Backfill username for existing users with validation-compliant values
UPDATE "users"
SET "username" = LEFT(
  COALESCE(
    NULLIF(
      BTRIM(
        REGEXP_REPLACE(
          REGEXP_REPLACE(
            LOWER(SPLIT_PART(email, '@', 1)),
            '[^a-z0-9]',
            '-',
            'g'
          ),
          '-+',
          '-',
          'g'
        ),
        '-'
      ),
      ''
    ),
    'user'
  ),
  23
) || '-' || SUBSTRING(id::text, 1, 6)
WHERE "username" IS NULL;

-- Now make username NOT NULL and add unique constraint
ALTER TABLE "users" ALTER COLUMN "username" SET NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS "users_username_key" ON "users"("username");