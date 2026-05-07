/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "username" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "level" SERIAL NOT NULL,
    "image_id" TEXT NOT NULL,

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
    "pos_x" INTEGER NOT NULL,
    "pos_y" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Logs" (
    "id" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "LeaderBoard" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "time" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Game_level_key" ON "Game"("level");

-- CreateIndex
CREATE UNIQUE INDEX "Game_image_id_key" ON "Game"("image_id");

-- CreateIndex
CREATE UNIQUE INDEX "MainImage_id_key" ON "MainImage"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MainImage_game_id_key" ON "MainImage"("game_id");

-- CreateIndex
CREATE UNIQUE INDEX "Characters_id_key" ON "Characters"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Characters_name_key" ON "Characters"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Characters_image_key" ON "Characters"("image");

-- CreateIndex
CREATE UNIQUE INDEX "Results_id_key" ON "Results"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Logs_id_key" ON "Logs"("id");

-- CreateIndex
CREATE UNIQUE INDEX "LeaderBoard_id_key" ON "LeaderBoard"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "MainImage" ADD CONSTRAINT "MainImage_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharactersOnGame" ADD CONSTRAINT "CharactersOnGame_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharactersOnGame" ADD CONSTRAINT "CharactersOnGame_char_id_fkey" FOREIGN KEY ("char_id") REFERENCES "Characters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_char_id_fkey" FOREIGN KEY ("char_id") REFERENCES "Characters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logs" ADD CONSTRAINT "Logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logs" ADD CONSTRAINT "Logs_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaderBoard" ADD CONSTRAINT "LeaderBoard_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaderBoard" ADD CONSTRAINT "LeaderBoard_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
