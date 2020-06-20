// var player1 = { name: 'You', color: 'yellow' };
// var player2 = { name: 'AI (Easy)', color: 'red' };
// var status = 'ready'; // 'ready', 'p1Turn', 'p2Turn', 'p1Win', 'p2Win'
var boardHTML = null
var columnsHTML = null
var redCont = 0
var yellowCount = 0
var turn = 'yellow'
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

var CheckWin = function (col, row) {
  // Columns Check
  for (var i = 0; i < board[col].length; i++) {
    if (board[col][i] === 'red') {
      redCont++
      if (redCont === 4) console.log('RED WON')
    } else redCont = 0

    if (board[col][i] === 'yellow') {
      yellowCount++
      if (yellowCount === 4) console.log('YELLOW WON')
    } else yellowCount = 0
  }

  // Rows Check
  for (var col = 0; col < 7; col++) {
    console.log(board[col][row])
  }
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
