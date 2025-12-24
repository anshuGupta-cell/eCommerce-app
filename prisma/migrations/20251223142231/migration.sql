/*
  Warnings:

  - You are about to drop the column `oid` on the `Item` table. All the data in the column will be lost.
  - Added the required column `description` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_oid_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "oid",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "stock" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Order_Item" (
    "qty" INTEGER NOT NULL DEFAULT 1,
    "oid" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,

    CONSTRAINT "Order_Item_pkey" PRIMARY KEY ("oid","item_id")
);

-- AddForeignKey
ALTER TABLE "Order_Item" ADD CONSTRAINT "Order_Item_oid_fkey" FOREIGN KEY ("oid") REFERENCES "Order"("oid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_Item" ADD CONSTRAINT "Order_Item_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;
