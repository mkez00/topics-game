import React, { Component } from 'react';

class PlayerForm extends Component {
  
  render() {
    return (
      <div>
        <label>Player {this.props.player.key}</label>
        <input type="text" value={this.props.player.name} data-key={this.props.player.key} onChange={this.props.playerNameChange} />
        <input type="button" onClick={this.props.deletePlayerHandler} data-key={this.props.player.key} value='Delete'/>
      </div>
    );
  }
}

export default PlayerForm;
