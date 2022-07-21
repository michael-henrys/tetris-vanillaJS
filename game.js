let board = []
let currentPiece
speed = 300


//create new piece and place it on the board
main()

function main() {
  currentPiece = createPiece()
  board.push(currentPiece)
  renderBoard()
  intervalID = setInterval(() => {
    if(canMoveDown()){
      movePieceDown()
    }else{
      //TODO: check if a row should be cleared
      clearInterval(intervalID)
      if(!checkGameOver()){
        main()    
      }else{
        //TODO: do game over stuff
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
      {x: 2, y: 0},
      {x: 3, y: 0},
      {x: 4, y: 0},
      {x: 5, y: 0},
    ]
  }
}

function checkGameOver() {
  if(board.find(piece => piece.cells.find(cell => cell.y === 0))) {
    return true
  }
  return false
}

function canMoveDown() {
  //for all the cells in the piece
  for (let i = 0; i < currentPiece.cells.length; i++) {
    newY = currentPiece.cells[i].y + 1
    if (!isInBounds(currentPiece.cells[i].x, newY) || isOverlap(currentPiece.cells[i].x, newY)) {
      return false
    }
  }
  return true
}

//function to check if cell is in bounds
function isInBounds(x, y) {
  return x >= 0 && x < 10 && y >= 0 && y < 15
}

//function to check if cell overlaps with other piece
function isOverlap(x, y) {
  if(board.find(otherPiece => otherPiece !== currentPiece && otherPiece.cells.find(cell => cell.y === newY))) {
    return true
  }
  return false
}

//function to move piece down 
function movePieceDown() {
  for (let i = 0; i < currentPiece.cells.length; i++) {
    currentPiece.cells[i].y = newY
  } 
}

//function to move piece left 
function movePieceLeft() {
  console.log('move left')
  //create a new cells array to store the new positions of the cells in the current piece
  newCells = []
  for (let i = 0; i < currentPiece.cells.length; i++) { 
    //calculate the new position of the x coordinate
    newX = currentPiece.cells[i].x - 1
    //check if in bounds and no overlap
    if (isInBounds(newX, currentPiece.cells[i].y) && !isOverlap(newX, currentPiece.cells[i].y)) {  
      //add the new position to the new cells array
      newCells.push({x: newX, y: currentPiece.cells[i].y})  
    }else{
      return
    }
  }
  //update the current piece's cells to the new cells array
  currentPiece.cells = newCells
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