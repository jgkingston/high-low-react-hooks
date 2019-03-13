import { DrawCardResult, DeckCard } from "./types";

type FunctionType = (...args: any[]) => any;
interface ActionCreatorsMapObject {
  [actionCreator: string]: FunctionType;
}
export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<A[keyof A]>;

export interface Action<T extends string> {
  type: T;
}
export interface ActionWithPayload<T extends string, P> extends Action<T> {
  payload: P;
}

export function createAction<T extends string>(type: T): Action<T>;
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;
export function createAction<T extends string, P>(type: T, payload?: P) {
  return payload === undefined ? { type } : { type, payload };
}

export enum ActionTypes {
  cardFlip = 'CARD_FLIP',
  cardReplace = 'CARD_REPLACE',
  deckSet = 'DECK_SET',
  guessCorrect = 'GUESS_CORRECT',
  guessIncorrect = 'GUESS_INCORRECT',
  guessPending = 'GUESS_PENDING',
  playerPass = 'PLAYER_PASS',
  playerRename = 'PLAYER_RENAME',
}

export const Actions = {
  cardFlip: (result: DrawCardResult) => createAction(ActionTypes.cardFlip, result),
  cardReplace: (result: DrawCardResult) => createAction(ActionTypes.cardReplace, result),
  deckSet: (result: DrawCardResult) => createAction(ActionTypes.deckSet, result),
  guessCorrect: (card: DeckCard) => createAction(ActionTypes.guessCorrect, card),
  guessIncorrect: (card: DeckCard) => createAction(ActionTypes.guessIncorrect, card),
  guessPending: () => createAction(ActionTypes.guessPending),
  playerPass: () => createAction(ActionTypes.playerPass),
  playerRename: (name: string, id: string) => createAction(ActionTypes.playerRename, { name, id }),
};

export type Actions = ActionsUnion<typeof Actions>;
