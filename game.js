let board = []
speed = 200


//create new piece and place it on the board
newPiece()

function newPiece() {
  let piece = createPiece()
  board.push(piece)
  renderBoard()
  intervalID = setInterval(() => {
    if(canMoveDown(piece)){
      console.log('can move down')
      movePieceDown(piece)
    }else{
      clearInterval(intervalID)
      if(!checkGameOver()){
        newPiece()    
      }
    }
    renderBoard()
  }, speed);
}


//creates a random new piece
function createPiece() {
  return {
    color: 'blue', 
    cells: [
      {x: 0, y: 0},
      {x: 1, y: 0},
      {x: 2, y: 0},
      {x: 3, y: 0},
    ]
  }
}

function checkGameOver() {
  if(board.find(piece => piece.cells.find(cell => cell.y === 0))) {
    return true
  }
  return false
}

function canMoveDown(piece) {
  //for all the cells in the piece
  for (let i = 0; i < piece.cells.length; i++) {
    newY = piece.cells[i].y + 1
    if (newY >= 15 || board.find(otherPiece => otherPiece !== piece && otherPiece.cells.find(cell => cell.y === newY))) {
      return false
    }
  }
  return true
}

//function to move piece down 
function movePieceDown(piece) {
  for (let i = 0; i < piece.cells.length; i++) {
    piece.cells[i].y = newY
  } 
}

function renderBoard() {
  //get the cells from the document
  let cells = document.getElementsByTagName('td');
  //clear board
  for (let i = 0; i < cells.length; i++) {
    cells[i].style.backgroundColor = 'lightgrey';
  }
  //for each object on board
  for (var i = 0; i < board.length; i++) {
    //for each cell in the object
    for (var j = 0; j < board[i].cells.length; j++) {
      //calculate the index of the cell
      let index = board[i].cells[j].x + board[i].cells[j].y * 10
      //put cell on board
      cells[index].style.backgroundColor = board[i].color;
    }
  }
}