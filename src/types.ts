interface CommonCard {
  code: string;
  image: string;
  suit: string;
}

interface SharedCardResult {
  success: boolean;
  deck_id: string;
  remaining: number;
}

interface DeckApiCard extends CommonCard {
  value: string;
}

export interface DeckApiDrawCardResult extends SharedCardResult {
  cards: DeckApiCard[];
}

export interface DeckCard extends CommonCard {
  value: number;
}

export interface DrawCardResult extends SharedCardResult {
  cards: DeckCard[];
}

export interface Player {
  id: string,
  name: string;
  pile: DeckCard[];
}

export interface AppState {
  activePlayer: number;
  correctGuesses: number;
  deckId: string;
  flippedCard: DeckCard | null;
  isGuessing: boolean;
  pile: DeckCard[];
  players: Player[];
  remaining: number;
}
