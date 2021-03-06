import React, { Component } from 'react';

class PlayerForm extends Component {

  render() {
    return (
      <tr>
        <td>Player {this.props.player.key}</td>
        <td>
          <input type="text" maxLength="10" value={this.props.player.name} data-key={this.props.player.key} onChange={this.props.playerNameChange} />
        </td>
        <td>
        {this.props.playerList[this.props.playerList.length-1].key==this.props.player.key &&
          <input className="button button-small" type="button" onClick={this.props.deletePlayerHandler} data-key={this.props.player.key} value='Delete'/>
        }
        </td>
      </tr>
    );
  }
}

export default PlayerForm;
