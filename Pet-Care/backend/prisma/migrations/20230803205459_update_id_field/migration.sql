/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - Added the required column `animal` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `disease` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `petSymptoms` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `petsName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "email",
DROP COLUMN "image",
ADD COLUMN     "animal" TEXT NOT NULL,
ADD COLUMN     "disease" TEXT NOT NULL,
ADD COLUMN     "petSymptoms" TEXT NOT NULL,
ADD COLUMN     "petsName" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";
