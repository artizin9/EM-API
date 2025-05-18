-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending', 'canceled', 'completed');

-- CreateTable
CREATE TABLE "Corporation" (
    "id" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "photoURL" TEXT NOT NULL,
    "place" TEXT NOT NULL,

    CONSTRAINT "Corporation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "photoURL" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scheduling" (
    "id" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'pending',
    "userId" TEXT NOT NULL,
    "timeId" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "finishedAt" TEXT,

    CONSTRAINT "Scheduling_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Time" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "corporationId" TEXT NOT NULL,

    CONSTRAINT "Time_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Corporation_id_key" ON "Corporation"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Corporation_cnpj_key" ON "Corporation"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Corporation_email_key" ON "Corporation"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Scheduling_id_key" ON "Scheduling"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Scheduling_timeId_key" ON "Scheduling"("timeId");

-- CreateIndex
CREATE UNIQUE INDEX "Time_id_key" ON "Time"("id");

-- AddForeignKey
ALTER TABLE "Scheduling" ADD CONSTRAINT "Scheduling_timeId_fkey" FOREIGN KEY ("timeId") REFERENCES "Time"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scheduling" ADD CONSTRAINT "Scheduling_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Time" ADD CONSTRAINT "Time_corporationId_fkey" FOREIGN KEY ("corporationId") REFERENCES "Corporation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
