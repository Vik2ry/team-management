/*
  Warnings:

  - Added the required column `askingPrice` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `forSale` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "askingPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "forSale" BOOLEAN NOT NULL;
