import React, { Component } from 'react';

import './App.css';

class Welcome extends Component {

  constructor(props){
    super(props);
    this.changeGameState = this.changeGameState.bind(this);
  }

  changeGameState(event){
    var newGameState = event.target.attributes.getNamedItem('data-next-state').value
    this.props.changeGameState(newGameState)
  }

  render() {
    return <div className="Welcome">
              <h3>Welcome to Topics Game</h3>
              <p>A game to play with friends.  All you need is one device and a display for everyone to see!</p>

              <h3>Instructions</h3>
              <p>Only one device is required to be used as a display and one user controlling the device as the dealer.</p>
              <p>The game requires 2-6 players.  Each player is playing for themselves.  The objective of the game is to collect the most cards.  The game ends when a player reaches a certain number of cards, or the number of topics are exhausted.</p>
              <p>When the game starts, each player owns a deck, a card is "dealt" to each player.  Each card will have a symbol and a unique topic.  Remember your symbol.  When another player is drawn a card with the same symbol as you, you must say (out loud) the answer to the topic displayed on your opponents card.  For example, if the topic that your opponent draws is "Sea Creature" you must say "Shark" (or something similar) before your opponent has a response for the topic on your card.  The player who answers first wins the round.  The person controlling the device will then click "remove" on the card that is to be given to the winner.  So in the aforementioned example, the "Sea Creature" card will be clicked.  Cards will continuously be dealt until there is a match showing on the board.  When a card is removed the card underneath will become visible, if the newly displayed card has a symbol that matches another card those two players must face off.</p>

              <div>
                <input className="button" onClick={this.changeGameState} data-next-state="SETUP" type="button" value="Start Game" />
              </div>

              <h3>Disclaimer</h3>
              <p>This product is solely devloped for personal purposes and was not developed for financial gains.  If this game resembles any licensed product I highly recommend purchasing that product.</p>
            </div>
  }
}

export default Welcome;
