/*
  Warnings:

  - Added the required column `eid` to the `item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "item" ADD COLUMN     "eid" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_eid_fkey" FOREIGN KEY ("eid") REFERENCES "emp"("eid") ON DELETE RESTRICT ON UPDATE CASCADE;
