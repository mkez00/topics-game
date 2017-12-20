import React, { Component } from 'react';

import PlayerForm from './PlayerForm.js';
import {Player} from './model/DataModels.js';

class GameSetup extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <p>The Game Setup form</p>
        <form>
          {this.props.players.map(player => <PlayerForm key={player.key} player={player}
                                                playerNameChange={this.props.playerNameChange}
                                                deletePlayerHandler={this.props.deletePlayerHandler} />)}
        </form>
        <button onClick={this.props.addPlayerHandler}>Add Player</button>
        <input onClick={this.props.changeGameState} data-next-state="GAME" type="button" value="Start Game" />
      </div>
    );
  }
}

export default GameSetup;
