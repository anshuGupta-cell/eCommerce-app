-- AlterTable
ALTER TABLE "order" ADD COLUMN     "description" TEXT NOT NULL DEFAULT 'No message',
ALTER COLUMN "mobile_no" SET DATA TYPE TEXT;
