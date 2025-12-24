-- CreateTable
CREATE TABLE "Post" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_id_key" ON "Post"("id");
