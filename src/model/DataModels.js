export function GameModel() {
  this.players = [];
  this.gameState = "WELCOME";
  this.gameMode = 5;
}

export function Player(){
  this.key = 0;
  this.name = "";
  this.correct = 0;
}

export function Game() {
  this.gamePlayers = [];
  this.fullDeck = [];
  this.gameTimerId = 0;
  this.paused = false;
}

export function GamePlayer(){
  this.key = 0;
  this.turn = false;
  this.cardDeck = [];
}

export function Card(){
  this.topic = "";
  this.symbol = 0;
}
