
type Difficulty = "Easy" | "Medium" | "Hard";

interface Image {
    id: string;
    src: string;
    game_id: string;
}

interface Character {
    id: string;
    name: string;
    image: string;
}

interface CharactersOnGame {
    char_id: string;
    game_id: string;
    character: Character;
}

interface Game {
    id: string;
    level: number;
    difficulty: Difficulty;
    image: Image | null;
    characters: CharactersOnGame[]
}  