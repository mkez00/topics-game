import React, { Component } from 'react';

import './App.css';

class Welcome extends Component {

  render() {
    return <div>
              <h3>Welcome to Topics Game</h3>
              <p>A game to play with friends.  All you need is one device and a display for everyone to see!</p>

              <h3>Gameplay</h3>
              <p>Made for 2-6 players.</p>

              <div>
                <input className="button" onClick={this.props.changeGameState} data-next-state="SETUP" type="button" value="Start Game" />
              </div>

              <h3>Disclaimer</h3>
              <p>This product is solely devloped for personal purposes and was not developed for financial gains.  If this game resembles any licensed product I highly recommend purchasing that product.</p>
            </div>
  }
}

export default Welcome;
