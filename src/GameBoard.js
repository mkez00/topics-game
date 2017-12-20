import React, { Component } from 'react';

import {Game} from './model/DataModels.js';
import {GamePlayer} from './model/DataModels.js';
import {Card} from './model/DataModels.js';

class GameBoard extends Component {

  constructor(props){
    super(props);
    var game = new Game();

    var data = require('./data/topics.json');
    game.fullDeck = data;

    var startingUserSet = false;
    var gamePlayers = this.props.players.map((player)=> {
      var gamePlayer = new GamePlayer();
      gamePlayer.key = player.key;
      if (!startingUserSet) {
        gamePlayer.turn = true;
        startingUserSet = true;
      }
      return gamePlayer;
    })
    game.gamePlayers = gamePlayers;
    this.state = {game: game}

    this.fetchNextCard = this.fetchNextCard.bind(this);
  }

  fetchNextCard(){
    var game = this.state.game;

    // get random card from deck
    var deck = this.state.game.fullDeck;
    var randomCard = deck[Math.floor(Math.random() * deck.length)];

    //remove item from deck
    var newDeck = deck.filter(topic => topic.name != randomCard.name);
    game.fullDeck = newDeck;

    //update players newDeck
    var currentTurnPlayerKey = 0;
    var gamePlayers = game.gamePlayers.map((gamePlayer)=>{
      if (!gamePlayer.turn) return gamePlayer;

      //store the current players id
      currentTurnPlayerKey = gamePlayer.key;

      var newDeck = gamePlayer.cardDeck;

      //setup card for players deck
      var card = new Card();
      card.topic = randomCard;
      card.symbol = Math.floor(Math.random() * 4);

      newDeck.push(card);
      return {...gamePlayer, cardDeck: newDeck};
    })

    game.gamePlayers = gamePlayers;
    this.setState({game: game});
  }

  calculateNextTurn(){
    var game = this.state.game;

    //get list of players with no cards
    var gamePlayersNoCards = game.gamePlayers.filter((gamePlayer)=>{
      if (gamePlayer.cardDeck.length==0){
        return gamePlayer;
      }
    })

    // if there are players with no cardDeck
    if (gamePlayersNoCards.length>0){
      //if the current turn user has no cards, return since they will go again
      if (gamePlayersNoCards.filter((gamePlayer)=>{if (gamePlayer.turn) return gamePlayer}).length>0){
        return this.setState({game: game});
      }

      //find the next player to the "right" that has no cardDeck
    }

    this.setState({game: game});
  }

  render() {

    var playerBoard = this.props.players.map((player)=>{

      //Game player is in state, playerboard is in props
      var gamePlayer = this.state.game.gamePlayers.filter((gamePlayer)=>{
        if (player.key==gamePlayer.key){
          return gamePlayer;
        }
      })[0]

      return <div key={player.key} data-key={player.key} onClick={this.props.incrementCorrectCount}>
              <h2>{player.name}</h2>
              { gamePlayer.cardDeck.length>0 &&
                <div>
                  <p>{gamePlayer.cardDeck[gamePlayer.cardDeck.length-1].topic.name}</p>
                  <p>{gamePlayer.cardDeck[gamePlayer.cardDeck.length-1].symbol}</p>
                </div>
              }
              <small>{player.correct}</small>
            </div>
    })

    return (
      <div>
        <p>The Game Board</p>
        <div>
          {playerBoard}
        </div>
        <div>
          <input type="button" value="Fetch Next Card" onClick={this.fetchNextCard} />
        </div>
        <input onClick={this.props.changeGameState} data-next-state="SETUP" type="button" value="New Game" />
        <input onClick={this.props.changeGameState} data-next-state="SUMMARY" type="button" value="End Game" />
      </div>
    );
  }
}

export default GameBoard;
