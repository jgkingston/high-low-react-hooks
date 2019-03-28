import { ActionTypes, Actions } from "./actions";
import { Reducer } from "react";
import { AppState } from "./types";

export const initialState: AppState = {
  activePlayer: 0,
  correctGuesses: 0,
  deckId: '',
  flippedCard: null,
  isGuessing: false,
  pile: [],
  players: [{
    id: '1',
    name: 'player one',
    pile: [],
  },
  {
    id: '2',
    name: 'player two',
    pile: [],
  }],
  remaining: 52,
};

export const reducer: Reducer<AppState, Actions> = (state, action) => {
  switch (action.type) {
    case ActionTypes.cardFlip:
      return {
        ...state,
        flippedCard: action.payload.cards[0],
        remaining: action.payload.remaining,
      }
    case ActionTypes.cardReplace:
      return {
        ...state,
        pile: action.payload.cards,
        remaining: action.payload.remaining,
      }
    case ActionTypes.deckSet:
      return {
        ...initialState,
        deckId: action.payload.deck_id,
        pile: action.payload.cards,
        remaining: action.payload.remaining,
      }
    case ActionTypes.guessCorrect:
      return {
        ...state,
        correctGuesses: state.correctGuesses + 1,
        flippedCard: null,
        isGuessing: false,
        pile: [action.payload, ...state.pile],
      }
    case ActionTypes.guessIncorrect:
      return {
        ...state,
        correctGuesses: 0,
        flippedCard: null,
        isGuessing: false,
        pile: [],
        players: state.players.map((player, index) => {
          if (index === state.activePlayer) {
            return {
              ...player,
              pile: player.pile.concat(state.pile, action.payload)
            }
          }
          return player;
        }),
      }
    case ActionTypes.guessPending:
      return {
        ...state,
        isGuessing: true,
      }
    case ActionTypes.playerPass:
      return {
        ...state,
        activePlayer: state.activePlayer === 1 ? 0 : 1,
        correctGuesses: 0,
      }
    case ActionTypes.playerRename:
      return {
        ...state,
        players: state.players.map(player => {
          if (player.id === action.payload.id) {
            return {
              ...player,
              name: action.payload.name,
            };
          }
          return player;
        })
      }
    default:
      return state;
  }
}
