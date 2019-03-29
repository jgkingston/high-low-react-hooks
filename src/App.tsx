import React, { useEffect, useReducer } from 'react';

import Button from '@material-ui/core/Button';

import './App.scss';
import { drawCard, shuffle } from './api';
import { DeckCard } from './types';
import { Actions } from './actions';
import { reducer, initialState } from './reducer';
import { GUESS_TYPES, GUESS_TYPE_HIGHER, shuffleSound, flipCardSound } from './constants';
import PlayerStatus from './components/PlayerStatus';
import { Grid, Stepper, Step, StepLabel, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@material-ui/core';
import CardPile from './components/CardPile';

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

  async function guess(guessType: string) {
    dispatch(Actions.guessPending());
    
    flipCardSound.play()
    const result = await drawCard(state.deckId)
    const flippedCard = result.cards[0];
    const correct = isCorrect(guessType, flippedCard);

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

  function getGameOverMessage() {
    const { players } = state;
    const [player1Score, player2Score] = players.map(player => player.pile.length)
    if (player1Score === player2Score) {
      return "It's a tie!";
    }
    return `${player1Score < player2Score ? players[0].name : players[1].name } wins!`
  }

  function toggleModal() {
    dispatch(Actions.modalRulesToggle());
  }

  const gameOver = state.remaining === 0 ||
    (state.remaining + state.pile.length) < Math.abs(state.players[0].pile.length - state.players[1].pile.length)
  const guessDisabled = state.pile.length === 0 ||
    state.isGuessing ||
    gameOver;
  const pileTopCard = state.pile[0] || {}
  const flippedCard = state.flippedCard || {}

  return (
    <div
      style={{
        padding: 16,
      }}
    >
      {
        gameOver && (
          <div className="pyro">
            <div className="before"></div>
            <div className="after"></div>
          </div>
        )
      }
      <Grid
        component="header"
        container
        direction="column"
        alignItems="center"
        style={{
          marginBottom: 16,
        }}
      >
        {
          gameOver && (
            <h2>{getGameOverMessage()}</h2>
          )
        }
        <Grid
          container
          justify="center"
        >
          {
            state.players.map((player, index) => (
              <PlayerStatus
                {...player}
                isActive={state.activePlayer === index}
                onChange={handleNameChange}
              />
            ))
          }
        </Grid>
      </Grid>
      <Grid
        component="main"
        container
        alignItems="center"
        direction="column"
      >
        <Grid
          container
          justify="center"
          style={{
            marginBottom: 16,
          }}
          wrap="nowrap"
        >
          <div style={{ margin: 8 }}>
            <CardPile
              {...flippedCard}
              cardsInPile={state.remaining}
              showCardBack={state.remaining > 0}
            />
          </div>
          <div style={{ margin: 8 }}>
            <CardPile
              {...pileTopCard}
              cardsInPile={state.pile.length}
            />
          </div>
        </Grid>
        <div className="button-group">
          <Grid
            container
            justify="center"
          >
            {
              GUESS_TYPES.map(guessType => (
                <Button
                  color="primary"
                  disabled={guessDisabled}
                  key={guessType}
                  onClick={() => guess(guessType)}
                  role="button"
                  variant="outlined"
                >
                  {guessType}
                </Button>
              ))
            }
            <Button
              color="primary"
              disabled={state.correctGuesses < 3 || !!state.flippedCard}
              onClick={pass}
              role="button"
              variant="contained"
            >
              {`Pass${state.correctGuesses < 3 ? ` (${3 - state.correctGuesses})` : ''}`}
            </Button>
          </Grid>
          <Grid
            container
            justify="center"
          >
            <Button
              onClick={reset}
              role="button"
              variant="text"
            >
              Reset Game
            </Button>
            <Button
              onClick={toggleModal}
              role="buton"
              variant="text"
            >
              Review Ruleset
            </Button>
          </Grid>
        </div>
      </Grid>
      <Dialog
        aria-labelledby="rules-dialog-title"
        open={state.showRulesModal}
        onClose={toggleModal}
      >
        <DialogTitle id="rules-dialog-title">
          High Low: The Rules
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            This is a two-player, hot-seat card game where players take turns guessing whether the next flipped card will be higher or lower than the last. If the guessing player is incorrect they take the newly flipped card and all the cards that have accumulated in the discard pile. Each card is a point and the object is to end the game with the fewest points. If a player is able to make three correct guesses in a row they have the option to pass play to their opponent. Instead of passing a player may choose to continue guessing so as not to provide their opponent with a easy guess. However the active player only retains the ability to pass as long as they keep guessing correctly. If they guess incorrectly at any point the correct guess counter resets to zero.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            color="primary"
            onClick={toggleModal}
          >
            Got it
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
