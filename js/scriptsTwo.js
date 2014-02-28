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
    if(Space.find(1,1).value === Space.find(2,2).value && Space.find(1,1).value === Space.find(3,3).value && Space.find(1,1).value !== "") {
      winner = Space.find(1,1).value;
    } else if(Space.find(1,3).value === Space.find(2,2).value && Space.find(1,3).value === Space.find(3,1).value && Space.find(1,1).value !== "") {
      winner = Space.find(1,3).value;
    }
    return winner;
  }
}

var Game = {
  create: function(factionX,factionY) {
    var newGame = Object.create(Game);
    newGame.board = Board.create();
    newGame.playerX = Player.create(factionX);
    newGame.playerY = Player.create(factionY);
    newGame.whoseTurn = newGame.whoStarts();
    return newGame;
  },
  gameOver: function() {
    if(this.board.whoIsWinner() !== false) {
      return this.board.whoIsWinner();
    } else if (this.board.boardSpaces.every(function(space){
        return space.value !== "";
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

$(document).ready(function () {
  var currentGame;
  $("form#start-game").submit(function(event) {
    event.preventDefault();

    $("#11").text("1,1");
    $("#12").text("1,2");
    $("#13").text("1,3");
    $("#21").text("2,1");
    $("#22").text("2,2");
    $("#23").text("2,3");
    $("#31").text("3,1");
    $("#32").text("3,2");
    $("#33").text("3,3");

    var factionX = $("input#new-faction-X-name").val(); 
    var factionY = $("input#new-faction-Y-name").val(); 
    currentGame = Game.create(factionX,factionY);
    alert(currentGame.whoseTurn + ' goes first!');

    this.reset();
      
    $("#game-play").show();
    $("#faction-entry").hide();
    $("#whose-turn").text(currentGame.whoseTurn);

    $("form#make-your-move").submit(function(event) {
      event.preventDefault();
      var moveX = parseInt($("select#new-x-move").val());
      var moveY = parseInt($("select#new-y-move").val());

      if(currentGame.makeMove(currentGame.whoseTurn, moveX, moveY)) {
        $("#" + moveX + moveY).text("");
        $("#" + moveX + moveY).append(currentGame.whoseTurn);
        currentGame.switchTurn();
        $("#whose-turn").text(currentGame.whoseTurn);        
      } else {
        alert('Please select an open square for your move, dum-dum!');
      }
      if (currentGame.gameOver() === "NOBODY WINS") {
        alert('The conflict has ground to a standstill. No faction wins. Please reset and try again. Do try harder next time.');
        $("#game-play").hide();
        $("#game-reset").show();
      } else if (currentGame.gameOver() !== false) {
        console.log(currentGame.gameOver());
        console.log(currentGame.whoIsWinner());
        alert(currentGame.gameOver() + " has conquered this lovely territory. Hooray and congratulations.");
        $("#game-play").hide();
        $("#game-reset").show();
      }
    });

    $("form#reset-the-game").submit(function(event) {
      event.preventDefault();
      $("#game-reset").hide();
      $("#faction-entry").show();
      $("#11").text("");
      $("#12").text("");
      $("#13").text("");
      $("#21").text("");
      $("#22").text("");
      $("#23").text("");
      $("#31").text("");
      $("#32").text("");
      $("#33").text("");
    });
  });  
});



