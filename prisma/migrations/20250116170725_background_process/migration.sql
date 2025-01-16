/*
  Warnings:

  - You are about to drop the column `askingPrice` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `forSale` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Player` table. All the data in the column will be lost.
  - Changed the type of `position` on the `Player` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `teamId` on table `Player` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Position" AS ENUM ('Goalkeeper', 'Defender', 'Midfielder', 'Attacker');

-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_teamId_fkey";

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "askingPrice",
DROP COLUMN "forSale",
DROP COLUMN "price",
ADD COLUMN     "value" DOUBLE PRECISION,
DROP COLUMN "position",
ADD COLUMN     "position" "Position" NOT NULL,
ALTER COLUMN "teamId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
