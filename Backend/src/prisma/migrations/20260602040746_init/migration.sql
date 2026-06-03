-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('Easy', 'Medium', 'Hard');

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sid" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "difficulty" "Difficulty" NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MainImage" (
    "id" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,

    CONSTRAINT "MainImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Characters" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharactersOnGame" (
    "game_id" TEXT NOT NULL,
    "char_id" TEXT NOT NULL,

    CONSTRAINT "CharactersOnGame_pkey" PRIMARY KEY ("game_id","char_id")
);

-- CreateTable
CREATE TABLE "Results" (
    "id" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "char_id" TEXT NOT NULL,
    "pos_x" DOUBLE PRECISION NOT NULL,
    "pos_y" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Logs" (
    "id" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeaderBoard" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "time" INTEGER NOT NULL,

    CONSTRAINT "LeaderBoard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_sid_key" ON "Session"("sid");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Game_level_key" ON "Game"("level");

-- CreateIndex
CREATE UNIQUE INDEX "MainImage_game_id_key" ON "MainImage"("game_id");

-- CreateIndex
CREATE UNIQUE INDEX "Characters_name_key" ON "Characters"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Characters_image_key" ON "Characters"("image");

-- CreateIndex
CREATE UNIQUE INDEX "Results_game_id_char_id_key" ON "Results"("game_id", "char_id");

-- AddForeignKey
ALTER TABLE "MainImage" ADD CONSTRAINT "MainImage_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharactersOnGame" ADD CONSTRAINT "CharactersOnGame_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharactersOnGame" ADD CONSTRAINT "CharactersOnGame_char_id_fkey" FOREIGN KEY ("char_id") REFERENCES "Characters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_char_id_fkey" FOREIGN KEY ("char_id") REFERENCES "Characters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logs" ADD CONSTRAINT "Logs_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logs" ADD CONSTRAINT "Logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaderBoard" ADD CONSTRAINT "LeaderBoard_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaderBoard" ADD CONSTRAINT "LeaderBoard_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
