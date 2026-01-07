/*
  Warnings:

  - You are about to drop the column `tile` on the `task` table. All the data in the column will be lost.
  - Added the required column `title` to the `task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."task" DROP COLUMN "tile",
ADD COLUMN     "title" TEXT NOT NULL;
