-- CreateTable
CREATE TABLE "bots" (
    "id" VARCHAR(10) NOT NULL,
    "growid" VARCHAR(20) NOT NULL,
    "password" VARCHAR(20) NOT NULL,
    "status" VARCHAR(100) DEFAULT 'disconnect',
    "ping" INTEGER DEFAULT 0,
    "world" VARCHAR(100),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bots_pkey" PRIMARY KEY ("id")
);
