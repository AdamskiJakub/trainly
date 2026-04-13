/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "instructor_profiles" ADD COLUMN     "availability" TEXT,
ADD COLUMN     "gallery" TEXT[] NOT NULL DEFAULT '{}',
ADD COLUMN     "goals" TEXT[] NOT NULL DEFAULT '{}',
ADD COLUMN     "languages" TEXT[] NOT NULL DEFAULT '{}',
ADD COLUMN     "tagline" TEXT,
ADD COLUMN     "tags" TEXT[] NOT NULL DEFAULT '{}';

-- AlterTable - Add username as nullable first
ALTER TABLE "users" ADD COLUMN     "username" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
