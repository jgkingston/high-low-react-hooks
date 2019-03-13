import React, { useEffect, useReducer } from 'react';
import './App.css';
import { drawCard, shuffle } from './api';
import { DeckCard } from './types';
import { Actions } from './actions';
import Card from './Card';
import { reducer, initialState } from './reducer';
import { GUESS_TYPES, GUESS_TYPE_HIGHER, shuffleSound, flipCardSound } from './constants';
import PlayerStatus from './PlayerStatus';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    shuffleSound.play()
    window.setTimeout(() => {
      flipCardSound.play()
    }, 500)
    window.setTimeout(() => {
      drawCard('new')
        .then((result) => {
          dispatch(Actions.deckSet(result));
        })
    }, 1100)
  }, []);

  async function reset() {
    shuffleSound.play()
    await shuffle(state.deckId);
    window.setTimeout(async () => {
      flipCardSound.play()
      const result = await drawCard(state.deckId)
      dispatch(Actions.deckSet(result));
    }, 600)
  }

  function isCorrect(guessType: string, flippedCard: DeckCard) {
    return guessType === GUESS_TYPE_HIGHER
      ? flippedCard.value > state.pile[0].value
      : flippedCard.value < state.pile[0].value
  }

  async function guess(event: React.MouseEvent<HTMLInputElement>) {
    dispatch(Actions.guessPending());
    
    const guess = event.currentTarget.value;
    flipCardSound.play()
    const result = await drawCard(state.deckId)
    const flippedCard = result.cards[0];
    const correct = isCorrect(guess, flippedCard);

    dispatch(Actions.cardFlip(result));

    window.setTimeout(async () => {
      if (correct) {
        dispatch(Actions.guessCorrect(flippedCard));
      } else {
        dispatch(Actions.guessIncorrect(flippedCard))
        window.setTimeout(async () => {
          flipCardSound.play()
          const nextResult = await drawCard(state.deckId)
          dispatch(Actions.cardReplace(nextResult));
        }, 500)
      }
    }, 600)
  }

  function pass() {
    dispatch(Actions.playerPass());
  }

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    const id = event.currentTarget.id;
    const name = event.currentTarget.value;
    dispatch(Actions.playerRename(name, id));
  }

  const guessDisabled = state.pile.length === 0 ||
    state.isGuessing ||
    state.remaining === 0;

  const pileTopCard = state.pile[0] || {}
  const flippedCard = state.flippedCard || {}

  return (
    <>
      <header
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h1>React Hi-Lo</h1>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            maxWidth: 300,
            width: '100%',
          }}
        >
          {
            state.players.map((player, index) => (
              <PlayerStatus
                key={player.id}
                {...player}
                isActive={state.activePlayer === index}
                onChange={handleNameChange}
              />
            ))
          }
        </div>
      </header>
      <main
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          padding: 16,
        }}
      >
        <span style={{ marginBottom: 16 }}>Cards remaining: {state.remaining}</span>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 16,
            width: 216
          }}
        >
          <Card
            {...flippedCard}
            isDeck={state.remaining > 0}
          />
          <Card {...pileTopCard} />
        </div>
        <div style={{ marginBottom: 16 }} >Cards in pile: {state.pile.length}</div>
        <div>
          {
            GUESS_TYPES.map(guessType => (
              <input
                disabled={guessDisabled}
                key={guessType}
                onClick={guess}
                type="button"
                value={guessType}
              />
            ))
          }
          <button
            disabled={state.pile.length < 3 || !!state.flippedCard}
            onClick={pass}
            role="button"
          >
            Pass
          </button>
          <button
            onClick={reset}
            role="button"
          >
            Reset
          </button>
        </div>
      </main>
    </>
  );
}

export default App;
