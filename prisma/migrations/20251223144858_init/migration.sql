/*
  Warnings:

  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Emp` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Feedback` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order_Item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_item_id_fkey";

-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_uid_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_uid_fkey";

-- DropForeignKey
ALTER TABLE "Order_Item" DROP CONSTRAINT "Order_Item_item_id_fkey";

-- DropForeignKey
ALTER TABLE "Order_Item" DROP CONSTRAINT "Order_Item_oid_fkey";

-- DropTable
DROP TABLE "Admin";

-- DropTable
DROP TABLE "Emp";

-- DropTable
DROP TABLE "Feedback";

-- DropTable
DROP TABLE "Item";

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "Order_Item";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "uid" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "item" (
    "item_id" SERIAL NOT NULL,
    "item_name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "item_pic" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,

    CONSTRAINT "item_pkey" PRIMARY KEY ("item_id")
);

-- CreateTable
CREATE TABLE "order" (
    "oid" SERIAL NOT NULL,
    "total_amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "address" TEXT NOT NULL,
    "mobile_no" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "uid" INTEGER NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("oid")
);

-- CreateTable
CREATE TABLE "order_item" (
    "qty" INTEGER NOT NULL DEFAULT 1,
    "oid" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,

    CONSTRAINT "order_item_pkey" PRIMARY KEY ("oid","item_id")
);

-- CreateTable
CREATE TABLE "feedback" (
    "fid" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "item_id" INTEGER NOT NULL,
    "uid" INTEGER NOT NULL,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("fid")
);

-- CreateTable
CREATE TABLE "admin" (
    "aid" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("aid")
);

-- CreateTable
CREATE TABLE "emp" (
    "eid" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "mobile_no" INTEGER NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "emp_pkey" PRIMARY KEY ("eid")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_uid_fkey" FOREIGN KEY ("uid") REFERENCES "user"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_oid_fkey" FOREIGN KEY ("oid") REFERENCES "order"("oid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_uid_fkey" FOREIGN KEY ("uid") REFERENCES "user"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
