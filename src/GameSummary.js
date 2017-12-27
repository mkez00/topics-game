import React, { Component } from 'react';

import './App.css';

class GameSummary extends Component {

  constructor(props){
    super(props);
    this.changeGameState = this.changeGameState.bind(this);
  }

  changeGameState(event){
    var newGameState = event.target.attributes.getNamedItem('data-next-state').value
    this.props.changeGameState(newGameState)
  }

  render() {
    var players = this.props.players;
    var playerRows = players.map((player)=>{
      return <tr key={player.key}>
        <td>{player.name}</td>
        <td>{player.correct}</td>
      </tr>
    })

    return (
      <div>
        <h3>Game Over!!!</h3>
        <table className="Table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Cards Collected</th>
            </tr>
          </thead>
          <tbody>
            {playerRows}
          </tbody>
        </table>
        <input className="button" onClick={this.changeGameState} data-next-state="SETUP" type="button" value="New Game" />
        <input className="button" onClick={this.changeGameState} data-next-state="GAME" type="button" value="Restart Game" />
      </div>
    );
  }
}

export default GameSummary;
