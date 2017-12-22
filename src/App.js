import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GameSetup from './GameSetup.js';
import GameBoard from './GameBoard.js';
import GameSummary from './GameSummary.js';
import Welcome from './Welcome.js';

import {GameModel} from './model/DataModels.js';
import {Player} from './model/DataModels.js';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {gameModel: new GameModel()}
    this.changeGameState = this.changeGameState.bind(this);
    this.addPlayerHandler = this.addPlayerHandler.bind(this);
    this.deletePlayerHandler = this.deletePlayerHandler.bind(this);
    this.playerNameChange = this.playerNameChange.bind(this);
    this.displayInConsole = this.displayInConsole.bind(this);
    this.incrementCorrectCount = this.incrementCorrectCount.bind(this);
  }

  changeGameState(event) {
    var newGameState = event.target.attributes.getNamedItem('data-next-state').value
    var gameModel = this.state.gameModel;
    gameModel.gameState = newGameState;
    this.setState(gameModel: gameModel);
  }

  addPlayerHandler(event) {
    var gameModel = this.state.gameModel;
    var player = new Player();
    player.key=gameModel.players.length+1;
    gameModel.players.push(player);
    this.setState({gameModel: gameModel});
  }

  deletePlayerHandler(event) {
    var gameModel = this.state.gameModel;
    var players = gameModel.players.filter(player => player.key != event.target.attributes.getNamedItem('data-key').value);
    gameModel.players = players;
    this.setState({gameModel: gameModel});
  }

  playerNameChange(event) {
    var key = event.target.attributes.getNamedItem('data-key').value;
    var gameModel = this.state.gameModel;
    var players = gameModel.players.map((player)=>{
      if (player.key!=key) return player;
      return {...player, name: event.target.value};
    })
    gameModel.players=players;
    this.setState({gameModel: gameModel});
  }

  incrementCorrectCount(key) {
    var gameModel = this.state.gameModel;
    var players = gameModel.players.map((player)=>{
      if (player.key!=key) return player;
      var newCorrect = player.correct + 1;
      return {...player, correct: newCorrect};
    })
    gameModel.players=players;
    this.setState({gameModel: gameModel});
  }

  displayInConsole(){
    console.debug(this.state.gameModel)
  }

  render() {
    return (
      <div className="App">
      <header className="App-header">
        <h1 className="App-title">Topics Game</h1>
      </header>
        {this.state.gameModel.gameState=="WELCOME" &&
          <Welcome
            changeGameState={this.changeGameState} />
        }
        {this.state.gameModel.gameState=="SETUP" &&
          <GameSetup players={this.state.gameModel.players}
            addPlayerHandler={this.addPlayerHandler}
            deletePlayerHandler={this.deletePlayerHandler}
            playerNameChange={this.playerNameChange}
            changeGameState={this.changeGameState} />
        }
        {this.state.gameModel.gameState=="GAME" &&
          <GameBoard players={this.state.gameModel.players}
            incrementCorrectCount={this.incrementCorrectCount}
            changeGameState={this.changeGameState} />
        }
        {this.state.gameModel.gameState=="SUMMARY" &&
          <GameSummary players={this.state.gameModel.players} changeGameState={this.changeGameState} />
        }
      </div>
    );
  }
}

export default App;
