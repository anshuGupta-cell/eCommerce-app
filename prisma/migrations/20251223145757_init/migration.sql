/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "feedback" DROP CONSTRAINT "feedback_uid_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_uid_fkey";

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "users" (
    "uid" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_uid_fkey" FOREIGN KEY ("uid") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_uid_fkey" FOREIGN KEY ("uid") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
