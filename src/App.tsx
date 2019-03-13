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
      drawCard('new')
        .then((result) => {
          dispatch(Actions.deckSet(result));
        })
    }, 500)
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
        const nextResult = await drawCard(state.deckId)
        dispatch(Actions.cardReplace(nextResult));
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
    <div
      style={{
        padding: 16,
      }}
    >
      <header
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          marginBottom: 16,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            maxWidth: 216,
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
        }}
      >
        
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 16,
            width: 216
          }}
        >
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Card
              {...flippedCard}
              isDeck={state.remaining > 0}
            />
            <span
              style={{
                fontSize: '.6rem',
                paddingTop: 8,
              }}
            >
              Cards remaining: {state.remaining}
            </span>
          </div>
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span
              style={{
                fontSize: '.6rem',
                paddingBottom: 8,
              }}
            >
              Cards in pile: {state.pile.length}
            </span>
            <Card {...pileTopCard} />
          </div>
        </div>
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
            disabled={state.correctGuesses < 3 || !!state.flippedCard}
            onClick={pass}
            role="button"
          >
            {`Pass${state.correctGuesses < 3 ? ` (${3 - state.correctGuesses})` : ''}`}
          </button>
          <button
            onClick={reset}
            role="button"
          >
            Reset
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
