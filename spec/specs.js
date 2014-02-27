beforeEach(function() {
  Space.all = [];
});

describe('Space', function() {
  describe('returnCoordinates', function() {
    it('returns the coordinates x,y', function() {
      var testSpace = Space.create(1,2);
      testSpace.returnCoordinates().should.eql([1,2]);
    });
  });
  describe('returnValue', function() {
    it('returns the current value at the Space: X, O or Empty', function() {
      var testSpace = Space.create(1,2);
      testSpace.value = 'X';
      testSpace.returnValue().should.equal('X');
    });
  });
  describe('markedBy', function() {
    it('sets the value of the Space depending on the player passed in', function() {
      var testSpace = Space.create(1,2);
      testSpace.markedBy('X').should.equal('X');
    });
    it('returns an error if the Space has already been marked', function() {
      var testSpace = Space.create(1,2);
      testSpace.markedBy('X');
      testSpace.markedBy('0').should.equal('Nope');
    });
  });
  describe('find', function() {
    it('returns the Space belonging to provided coordinates', function() {
      var testSpace = Space.create(1,2);
      var testSpaceTwo = Space.create(1,3);
      Space.find(1,3).should.equal(testSpaceTwo);
    });
  });
});

describe('Player', function() {
  it('returns whether the player belongs to the X or O faction', function() {
    var newPlayer = Player.create('X');
    newPlayer.faction.should.equal('X');
  });
});

describe('Board', function(){
  describe('create', function() {
    it('creates a board with 9 spaces', function() {
      var newBoard = Board.create();
      newBoard.boardSpaces.length = 9;
    });
  });
  describe('whoIsWinner', function() {
    it('returns the first player to mark three spaces in a row', function() {
      var newBoard = Board.create();
      Space.find(1,2).markedBy('X');
      Space.find(1,1).markedBy('X');
      Space.find(1,3).markedBy('X');
      newBoard.whoIsWinner().should.equal('X');
    });
    it('returns the winning faction for diagonal victory states', function() {
      var newBoard = Board.create();
      Space.find(1,1).markedBy('X');
      Space.find(2,2).markedBy('X');
      Space.find(3,3).markedBy('X');
      newBoard.whoIsWinner().should.equal('X');
    });
  });
});

describe('Game', function() {
  describe('create', function() {
    it('creates a game containing a proper board', function() {
      var newGame = Game.create();
      newGame.board.boardSpaces.length.should.equal(9);
    });
    it('creates two warring factions', function() {
      var newGame = Game.create();
      newGame.playerX.faction.should.equal('X');
      newGame.playerY.faction.should.equal('Y');
    });
  });
  describe('switchTurn', function() {
    it("switches which player's turn it is", function() {
      var newGame = Game.create();
      newGame.whoseTurn = 'X';
      newGame.switchTurn();
      newGame.whoseTurn.should.equal('Y');
    });
  });
  describe('gameOver', function() {
    it('halts the game once a winner is determined', function() {
      var newGame = Game.create();
      Space.find(1,2).markedBy('X');
      Space.find(1,1).markedBy('X');
      Space.find(1,3).markedBy('X');
      newGame.gameOver().should.equal('X');
    });
    it('halts the game if there are no more moves left', function() {
      var newGame = Game.create();
      Space.find(1,2).markedBy('A');
      Space.find(1,1).markedBy('B');
      Space.find(1,3).markedBy('C');
      Space.find(2,2).markedBy('D');
      Space.find(2,1).markedBy('E');
      Space.find(2,3).markedBy('F');
      Space.find(3,2).markedBy('G');
      Space.find(3,1).markedBy('H');
      Space.find(3,3).markedBy('I');
      newGame.gameOver().should.equal('NOBODY WINS');
    });
  });
  describe('whoStarts', function() {
    it('returns a random game starting faction', function() {
      var newGame = Game.create();
      newGame.whoseTurn.should.match(/[XY]/);
    });
  });
  describe('makeMove', function() {
    it('returns true if the move was successful', function() {
      var newGame = Game.create();
      newGame.makeMove(newGame.playerX.faction, 1, 2).should.equal(true);
    });
    it('returns false if the move cannot be completed', function() {
      var newGame = Game.create();
      Space.find(1,2).markedBy('Y');
      newGame.makeMove(newGame.playerX.faction, 1, 2).should.equal(false);
    });
    it('updates space value with correct faction', function() {
      var newGame = Game.create();
      newGame.makeMove(newGame.playerX.faction, 1, 2);
      Space.find(1,2).value.should.equal("X");
    });
  });
});
