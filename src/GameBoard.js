import React, { Component } from 'react';

import {Game} from './model/DataModels.js';
import {GamePlayer} from './model/DataModels.js';
import {Card} from './model/DataModels.js';

import Symbol from './Symbol.js';
import './App.css';

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
    this.calculateNextTurn = this.calculateNextTurn.bind(this);
    this.collectCard = this.collectCard.bind(this);
    this.incrementCorrectCount = props.incrementCorrectCount.bind(this);
  }

  fetchNextCard(){
    var game = this.state.game;
    if (this.faceOffPending(game.gamePlayers)){
      return;
    }

    // get random card from deck
    var deck = this.state.game.fullDeck;

    if (deck.length==0){
      return;
    }

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

  // When two players have the same symbol aligned, they are now facing off with one another,
  // return of empty array indicates no face off this turn
  getFaceOff(gamePlayers){
    var faceOff = []
    if (gamePlayers.length>0){
      gamePlayers.map((gamePlayer)=>{
        if (gamePlayer.cardDeck.length>0){
          gamePlayers.map((gamePlayer2)=>{
            if (gamePlayer2.cardDeck.length>0){
              // only care about top card in players decks
              if (gamePlayer.key!=gamePlayer2.key &&
                  gamePlayer.cardDeck[gamePlayer.cardDeck.length-1].symbol==gamePlayer2.cardDeck[gamePlayer2.cardDeck.length-1].symbol){
                faceOff.push(gamePlayer);
                faceOff.push(gamePlayer2);
              }
            }
          })
        }
      })
    }
    return faceOff;
  }

  collectCard(event){
    var game = this.state.game;
    var faceOffList = this.getFaceOff(game.gamePlayers)
    if (faceOffList.length>0){
      var keyLoser = event.target.attributes.getNamedItem('data-key').value; //key of player losing cardDeck
      var keyWinner = null
      faceOffList.map((gamePlayer)=>{
        if (gamePlayer.key!=keyLoser){
          keyWinner = gamePlayer.key
        }
      })

      //remove top card from card deck of loser
      var gamePlayers = game.gamePlayers.map((gamePlayer)=>{
        if (gamePlayer.key==keyLoser){
          //remove top card from card deck
          gamePlayer.cardDeck.pop()
        }
        return gamePlayer
      })

      // increment correct count for player
      this.incrementCorrectCount(keyWinner)

      game.gamePlayers = gamePlayers;
      this.setState({game: game});
    }

  }

  faceOffPending(gamePlayers){
    if (this.getFaceOff(gamePlayers).length>0){
      return true
    } else {
      return false
    }
  }

  calculateNextTurn(){
    var game = this.state.game;

    if (this.faceOffPending(game.gamePlayers)){
      return;
    }

    //reset all turns to false
    var lastTurnPlayer = null; //the last player to have a turn
    var gamePlayers = game.gamePlayers.map((gamePlayer)=>{
      if (gamePlayer.turn){
        lastTurnPlayer = gamePlayer;
      }
      gamePlayer.turn=false;
      return gamePlayer;
    })

    // if a player has no card deck, set their turn to true and be done with it
    var turnSet = false;
    gamePlayers = gamePlayers.filter((gamePlayer)=>{
      if (gamePlayer.cardDeck.length==0 && !turnSet){
        gamePlayer.turn=true;
        turnSet = true;
        return gamePlayer;
      } else {
        return gamePlayer;
      }
    })

    // if the next turn hasn't beeen set, go to the next player
    if (!turnSet){
      gamePlayers = gamePlayers.filter((gamePlayer)=>{
        if (gamePlayer.key==lastTurnPlayer.key+1){
          turnSet=true;
          gamePlayer.turn=true;
        }
        return gamePlayer
      })
    }

    //turn not set yet, give it to first player
    if (!turnSet){
      gamePlayers[0].turn=true;
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

      return <div key={player.key} data-key={player.key} className="Player">
              <h2>{player.name}</h2>
              { gamePlayer.cardDeck.length>0 &&
                <div>
                  <input type="button" value="Collect" onClick={this.collectCard} data-key={player.key}  />
                  <p>{gamePlayer.cardDeck[gamePlayer.cardDeck.length-1].topic.name}</p>
                  <Symbol symbol={gamePlayer.cardDeck[gamePlayer.cardDeck.length-1].symbol} />
                </div>
              }
              <small>{player.correct}</small>
            </div>
    })

    return (
      <div>
        <p>The Game Board</p>
        <div className="GameBoard">
          {playerBoard}
        </div>
        <div>
          <input type="button" value="Calculate Next Turn" onClick={this.calculateNextTurn} />
          <input type="button" value="Fetch Next Card" onClick={this.fetchNextCard} />
        </div>
        <input onClick={this.props.changeGameState} data-next-state="SETUP" type="button" value="New Game" />
        <input onClick={this.props.changeGameState} data-next-state="SUMMARY" type="button" value="End Game" />
      </div>
    );
  }
}

export default GameBoard;
