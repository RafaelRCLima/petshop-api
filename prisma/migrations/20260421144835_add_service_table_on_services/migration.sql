/*
  Warnings:

  - Added the required column `service` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "services" ADD COLUMN     "service" TEXT NOT NULL;
