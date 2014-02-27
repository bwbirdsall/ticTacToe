var Space = {
  all: [],
  create: function(x, y) {
    var newSpace = Object.create(Space);
    newSpace.x = x;
    newSpace.y = y;
    newSpace.value = "";
    this.all.push(newSpace);
    return newSpace;
  },
  find: function(x,y) {
    var match = false;
    Space.all.forEach(function(space) {
      if(space.x === x) {
        if(space.y === y) {
          match = space;
        }
      }
    });
    return match;
  },
  markedBy: function(player) {
    if(this.value === "") {
      this.value = player;
      return this.value;
    } else {
      return "Nope";
    }
  },
  returnCoordinates: function() {
    return [this.x, this.y]; 
  },
  returnValue: function() {
    return this.value;
  }
}

var Player = {
  create: function(faction) {
    var newPlayer = Object.create(Player);
    newPlayer.faction = faction;
    return newPlayer;
  }
}

var Board = {
  create: function() {
    var newBoard = Object.create(Board);
    newBoard.boardSpaces = [];
    newBoard.fillBoard();
    return newBoard;
  },
  fillBoard: function() {
    for(var x = 1; x < 4; x++) {
      for(var y = 1; y < 4; y++) {
        this.boardSpaces.push(Space.create(x,y));
      }
    }
  },
  whoIsWinner: function() {
    var winner = false;
    for(var x = 1; x < 4; x++) {
      var space1 = Space.find(x,1);
      var space2 = Space.find(x,2);
      var space3 = Space.find(x,3);
      if(space1.value === space2.value && space1.value === space3.value && space1.value != "") {
        winner = space1.value;
      }
    }
    for(var y = 1; y < 4; y++) {
      var space1 = Space.find(1,y);
      var space2 = Space.find(2,y);
      var space3 = Space.find(3,y);
      if(space1.value === space2.value && space1.value === space3.value && space1.value != "") {
        winner = space1.value;
      }
    }
    if(Space.find(1,1).value === Space.find(2,2).value && Space.find(1,1).value === Space.find(3,3).value) {
      winner = Space.find(1,1).value;
    } else if(Space.find(1,3).value === Space.find(2,2).value && Space.find(1,3).value === Space.find(3,1).value) {
      winner = Space.find(1,3).value;
    }
    return winner;
  }
}

var Game = {
  create: function() {
    var newGame = Object.create(Game);
    newGame.board = Board.create();
    newGame.playerX = Player.create("X");
    newGame.playerY = Player.create("Y");
    newGame.whoseTurn = newGame.whoStarts();
    return newGame;
  },
  gameOver: function() {
    if(this.board.whoIsWinner() !== false) {
      return this.board.whoIsWinner();
    } else if (this.board.boardSpaces.every(function(space){
        return space.faction !== "";
      })) {
      return "NOBODY WINS";
    } else {
      return false;
    }
  },
  makeMove: function(playerFaction, x, y) {
    var moveSpace = Space.find(x,y);
    if(moveSpace.value === "") {
      moveSpace.value = playerFaction;
      return true;
    } else {
      return false;
    }
  },
  switchTurn: function() {
    if(this.whoseTurn === this.playerX.faction) {
      this.whoseTurn = this.playerY.faction;
    } else {
      this.whoseTurn = this.playerX.faction;
    }
  },
  whoStarts: function() {
    if(Math.round(Math.random()) === 1) {
      return this.playerY.faction;
    } else {
      return this.playerX.faction;
    }
  }
}
