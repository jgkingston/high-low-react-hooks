This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Overview

### The Game

This is a two-player, hot-seat card game where players take turns guessing whether the next flipped card will be higher or lower than the last. If the guessing player is incorrect they take the newly flipped card and all the cards that have accumulated in the discard pile. Each card is a point and the object is to end the game with the fewest points. If a player is able to make three correct guesses in a row they have the option to pass play to their opponent. Instead of passing a player may choose to continue guessing so as not to provide their opponent with a easy guess. However the active player only retains the ability to pass as long as they keep guessing correctly. If they guess incorrectly at any point the correct guess counter resets to zero.

### The App

This was built using React, with a emphasis on the new hooks api, and leverages the API provided by http://deckofcardsapi.com/.

A playable demo can be found here: [https://jgkingston.github.io/high-low-react-hooks/](https://jgkingston.github.io/high-low-react-hooks/)

## Instructions for Local development

```sh
$ git clone https://github.com/jgkingston/high-low-react-hooks.git high-low-react-hooks
$ cd high-low-react-hooks
$ npm install
$ npm start

```
