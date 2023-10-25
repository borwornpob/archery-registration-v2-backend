-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "telnumber" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_telnumber_key" ON "User"("telnumber");
