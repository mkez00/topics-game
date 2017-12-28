import React, { Component } from 'react';

import PlayerForm from './PlayerForm.js';
import {Player} from './model/DataModels.js';

class GameSetup extends Component {

  constructor(props){
    super(props);
    this.changeGameState = this.changeGameState.bind(this);
  }

  changeGameState(event){
    var newGameState = event.target.attributes.getNamedItem('data-next-state').value
    var gameMode = parseInt(event.target.attributes.getNamedItem('data-game-mode').value)
    this.props.changeGameMode(gameMode)
    this.props.changeGameState(newGameState)
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
            <input className="button" onClick={this.changeGameState} data-game-mode="5" data-next-state="GAME" type="button" value="Start Game (first to 5)" />
            <input className="button" onClick={this.changeGameState} data-game-mode="10" data-next-state="GAME" type="button" value="Start Game (first to 10)" />
            <input className="button" onClick={this.changeGameState} data-game-mode="15" data-next-state="GAME" type="button" value="Start Game (first to 15)" />
            <input className="button" onClick={this.changeGameState} data-game-mode="20" data-next-state="GAME" type="button" value="Start Game (first to 20)" />
          </div>
        }
        </div>
      </div>
    );
  }
}

export default GameSetup;
