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
        <table className="Table">
          <thead>
            <tr>
              <th>Player</th>
              <th>Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {this.props.players.map(player => <PlayerForm key={player.key} player={player}
                                                playerList={this.props.players}
                                                playerNameChange={this.props.playerNameChange}
                                                deletePlayerHandler={this.props.deletePlayerHandler} />)}
          </tbody>
        </table>
        <button onClick={this.props.addPlayerHandler}>Add Player</button>
        <input onClick={this.props.changeGameState} data-next-state="GAME" type="button" value="Start Game" />
      </div>
    );
  }
}

export default GameSetup;
