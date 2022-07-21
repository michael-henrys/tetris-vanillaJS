board = [
  {
    color: 'blue', 
    cells: [
      {x: 0, y: 0},
      {x: 1, y: 0},
      {x: 2, y: 0},
      {x: 3, y: 0},
    ]
  }
]

function renderBoard(board) {
  //get the cells from the document
  let cells = document.getElementsByTagName('td');
  console.log(cells[0])
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

renderBoard(board)