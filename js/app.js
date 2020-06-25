// var player1 = { name: 'You', color: 'yellow' };
// var player2 = { name: 'AI (Easy)', color: 'red' };
// var status = 'ready'; // 'ready', 'p1Turn', 'p2Turn', 'p1Win', 'p2Win'
var boardHTML = null
var columnsHTML = null
var colorCount
var turn = ''

var board = [
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null]
]

var toggleTurn = function () {
  turn = (turn === 'yellow') ? 'red' : 'yellow'
}

var gameOver = function (turnColor) {
  // TODO
}

var columnsCheck = function (col) {
  colorCount = 0

  for (var i = 0; i < board[col].length; i++) {
    if (board[col][i] === turn) {
      colorCount++
      if (colorCount === 4) return console.log(turn + ' WON') // TODO function gameOver
    } else break
  }
}

var rowsCheck = function (row) {
  colorCount = 0

  for (var i = 0; i < columnsHTML.length; i++) {
    if (board[i][row] === turn) {
      colorCount++
      if (colorCount === 4) return console.log(turn + ' WON') // TODO function game over
    } else colorCount = 0
  }
}

var descDiagCheck = function (col, row) {
  colorCount = 0

  for (var i = col, j = row; i >= 0 && i < columnsHTML.length && j >= 0 && j < board[col].length; i++, j--){
    if (board[i][j] === turn) {
      colorCount++
      if (colorCount === 4) return console.log(turn + ' WON')
    } else break
  }
  
  for (;col >= 0 && row < board[col].length; col--, row++) {
    if (board[col][row] === turn) {
      colorCount++
      if (colorCount === 5) return console.log(turn + ' WON')
    } else colorCount = 0
  }
  
}

var ascDiagCheck = function (col, row) {
  colorCount = 0

  for (
    var i = (col - row < 0) ? 0 : col - row, j = (row - col < 0) ? 0 : row - col; i >= 0 && i < columnsHTML.length && j >= 0 && j < board[col].length; i++, j++
  ) {
    if (board[i][j] === turn) {
      colorCount++
      if (colorCount === 4) return console.log(turn + ' WON')
    } else colorCount = 0
  }

  if (colorCount < 4) colorCount = 0
}

var CheckWin = function (col, row) {
  // Columns Check
  columnsCheck(col)

  // Rows Check
  rowsCheck(row)

  // Descending Diagonal Check
  descDiagCheck(col, row)

  // Ascending Diagonal Check
  ascDiagCheck(col, row)
}

var columnEventHandler = function (evt) {
  var columnId = +evt.target.id.substr(1, 1)
  for (var i = 0; i < board[columnId].length; i++) {
    if (!board[columnId][i]) {
      board[columnId][i] = turn
      CheckWin(columnId,i)
      toggleTurn()
      render()
      break
    }
  }
}

var bindColumnHandlers = function () {
  columnsHTML = document.getElementsByClassName('column')
  for (var i = 0; i < columnsHTML.length; i++) {
    columnsHTML[i].onclick = columnEventHandler
  }
}

var render = function () {
  var html = ''
  for (var i = 0; i < board.length; i++) {
    html += '<div id="c' + i + '" class="column">'
    for (var j = board[i].length - 1; j >= 0; j--) {
      html += '<div id="s' + i + j + '" class="spot'
      if (board[i][j]) html += ' ' + board[i][j]
      html += '"></div>'
    }
    html += '</div>'
  }
  boardHTML.innerHTML = html
  bindColumnHandlers()
}

var init = function () {
  boardHTML = document.getElementById('board')
  turn = Math.random() > 0.5 ? 'yellow' : 'red'
  render()
}

window.onload = init
