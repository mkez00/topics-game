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
        <h3>Game Setup</h3>
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
        <div className="BottomButtons">
        {this.props.players.length<6 &&
        <button className="button" onClick={this.props.addPlayerHandler}>Add Player</button>
        }
        {this.props.players.length>1 &&
          <div>
            <input className="button" onClick={this.props.changeGameState} data-next-state="GAME" type="button" value="Start Game (first to 20)" />
            <input className="button" onClick={this.props.changeGameState} data-next-state="GAME" type="button" value="Start Game (100 card play)" />
          </div>
        }
        </div>
      </div>
    );
  }
}

export default GameSetup;
