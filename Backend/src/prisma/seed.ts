import { prisma } from "../config/prisma.js";
import { Difficulty } from "../generated/prisma/enums.js";

const levels = [
  {
    level: 1,
    image: "/images/level1/image.png",
    difficulty: Difficulty.Medium,
    characters: [
      {
        image: "/images/level1/characters/Odlaw.png",
        name: "Odlaw",
      },
      {
        image: "/images/level1/characters/Waldo.png",
        name: "Waldo",
      },
      {
        image: "/images/level1/characters/Wizard.png",
        name: "Wizard",
      },
    ],
  },
];

const results = [
  {
    level: 1,
    results: [
      {
        name: "Odlaw",
        x: 0.25,
        y: 0.48,
      },
      {
        name: "Waldo",
        x: 0.53,
        y: 0.49,
      },
      {
        name: "Wizard",
        x: 0.63,
        y: 0.48,
      },
    ],
  },
];

async function main() {
  console.log("🌱 Starting seed...");

  /*
   * 1. Seed unique characters
   */
  const allCharacters = levels.flatMap((level) => level.characters);

  const uniqueCharacters = Array.from(
    new Map(allCharacters.map((char) => [char.name, char])).values()
  );

  for (const character of uniqueCharacters) {
    await prisma.characters.upsert({
      where: {
        name: character.name,
      },
      update: {
        image: character.image,
      },
      create: {
        name: character.name,
        image: character.image,
      },
    });
  }

  /*
   * 2. Cache characters for quick lookup
   */
  const dbCharacters = await prisma.characters.findMany();

  const characterMap = new Map(
    dbCharacters.map((char) => [char.name, char.id])
  );

  /*
   * 3. Seed games + main image + game-character relations
   */
  for (const levelData of levels) {
    const game = await prisma.game.upsert({
      where: {
        level: levelData.level,
      },
      update: {
        difficulty: levelData.difficulty,
      },
      create: {
        level: levelData.level,
        difficulty: levelData.difficulty,
      },
    });

    await prisma.mainImage.upsert({
      where: {
        game_id: game.id,
      },
      update: {
        src: levelData.image,
      },
      create: {
        game_id: game.id,
        src: levelData.image,
      },
    });

    /*
     * Character relations
     */
    for (const character of levelData.characters) {
      const charId = characterMap.get(character.name);

      if (!charId) continue;

      await prisma.charactersOnGame.upsert({
        where: {
          game_id_char_id: {
            game_id: game.id,
            char_id: charId,
          },
        },
        update: {},
        create: {
          game_id: game.id,
          char_id: charId,
        },
      });
    }
  }

  /*
   * 4. Seed result positions
   */
  for (const resultGroup of results) {
    const game = await prisma.game.findUnique({
      where: {
        level: resultGroup.level,
      },
    });

    if (!game) continue;

    for (const result of resultGroup.results) {
      const charId = characterMap.get(result.name);

      if (!charId) continue;

      await prisma.results.upsert({
        where: {
          game_id_char_id: {
            game_id: game.id,
            char_id: charId,
          },
        },
        update: {
          pos_x: result.x,
          pos_y: result.y,
        },
        create: {
          game_id: game.id,
          char_id: charId,
          pos_x: result.x,
          pos_y: result.y,
        },
      });
    }
  }

  console.log("✅ Seed completed.");
}

main()
  .catch((err) => {
    console.error("❌ Seed failed");
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });