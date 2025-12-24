/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('vendor', 'delivery_man');

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "User" (
    "uid" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Order" (
    "oid" SERIAL NOT NULL,
    "total_amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "address" TEXT NOT NULL,
    "mobile_no" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "uid" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("oid")
);

-- CreateTable
CREATE TABLE "Item" (
    "item_id" SERIAL NOT NULL,
    "item_name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "item_pic" TEXT NOT NULL,
    "oid" INTEGER NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("item_id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "fid" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "item_id" INTEGER NOT NULL,
    "uid" INTEGER NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("fid")
);

-- CreateTable
CREATE TABLE "Admin" (
    "aid" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("aid")
);

-- CreateTable
CREATE TABLE "Emp" (
    "eid" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "mobile_no" INTEGER NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "Emp_pkey" PRIMARY KEY ("eid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_oid_fkey" FOREIGN KEY ("oid") REFERENCES "Order"("oid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
