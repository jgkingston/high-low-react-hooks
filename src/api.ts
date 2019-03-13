import { FaceCardValueMap } from "./constants";
import { DeckApiDrawCardResult } from "./types";

const handleResponse = (response: Response) => response.json();
const handleSuccess = (result: DeckApiDrawCardResult) => ({
  ...result,
  cards: result.cards
    .map(card => ({
      ...card,
      value: FaceCardValueMap[card.value] || +card.value,
    })),
})

export const drawCard = (deckId: string) =>
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    .then(handleResponse)
    .then(handleSuccess)
        
export const shuffle = (deckId: string) =>
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
    .then(handleResponse)