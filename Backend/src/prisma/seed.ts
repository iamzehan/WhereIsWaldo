import { prisma } from "../config/prisma.js";
import { Difficulty } from "../generated/prisma/enums.js";

const levels = [
  {
    level: 1,
    image: "/images/level1/image.png",
    difficulty: Difficulty.Medium,

    characters: [
      {
        name: "Odlaw",
        image: "/images/level1/characters/Odlaw.png",
        x: 0.25,
        y: 0.48,
      },
      {
        name: "Waldo",
        image: "/images/level1/characters/Waldo.png",
        x: 0.53,
        y: 0.49,
      },
      {
        name: "Wizard",
        image: "/images/level1/characters/Wizard.png",
        x: 0.63,
        y: 0.48,
      },
    ],
  },
];

async function main() {
  console.log("🌱 Seeding...");

  for (const level of levels) {
    const game = await prisma.game.upsert({
      where: {
        level: level.level,
      },
      update: {
        difficulty: level.difficulty,
      },
      create: {
        level: level.level,
        difficulty: level.difficulty,
      },
    });

    await prisma.mainImage.upsert({
      where: {
        game_id: game.id,
      },
      update: {
        src: level.image,
      },
      create: {
        game_id: game.id,
        src: level.image,
      },
    });

    for (const char of level.characters) {
      const character = await prisma.characters.upsert({
        where: {
          name: char.name,
        },
        update: {
          image: char.image,
        },
        create: {
          name: char.name,
          image: char.image,
        },
      });

      await prisma.charactersOnGame.upsert({
        where: {
          game_id_char_id: {
            game_id: game.id,
            char_id: character.id,
          },
        },
        update: {},
        create: {
          game_id: game.id,
          char_id: character.id,
        },
      });

      await prisma.results.upsert({
        where: {
          game_id_char_id: {
            game_id: game.id,
            char_id: character.id,
          },
        },
        update: {
          pos_x: char.x,
          pos_y: char.y,
        },
        create: {
          game_id: game.id,
          char_id: character.id,
          pos_x: char.x,
          pos_y: char.y,
        },
      });
    }
  }

  console.log("✅ Seed complete");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });