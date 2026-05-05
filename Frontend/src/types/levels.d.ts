type Difficulty = "Easy" | "Medium" | "Hard";

interface BadgeProps {
  level: Difficulty;
}

interface Character {
  image: string;
  name: string;
}

interface Level {
  level: string;
  image: string;
  difficulty: Difficulty;
  characters: Character[];
}
