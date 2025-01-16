/*
  Warnings:

  - Made the column `askingPrice` on table `Player` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Player" ALTER COLUMN "askingPrice" SET NOT NULL;
