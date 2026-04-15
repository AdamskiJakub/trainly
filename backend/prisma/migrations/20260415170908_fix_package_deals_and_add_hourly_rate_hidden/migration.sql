/*
  Warnings:

  - Made the column `packageDealsEnabled` on table `instructor_profiles` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "instructor_profiles" ADD COLUMN     "hourlyRateHidden" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "packageDealsEnabled" SET NOT NULL;
