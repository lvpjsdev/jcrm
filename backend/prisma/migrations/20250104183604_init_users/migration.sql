-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "telegram" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "period" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_telegram_key" ON "User"("telegram");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
