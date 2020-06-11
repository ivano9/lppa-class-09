// var player1 = { name: 'You', color: 'yellow' };
// var player2 = { name: 'AI (Easy)', color: 'red' };
// var status = 'ready'; // 'ready', 'p1Turn', 'p2Turn', 'p1Win', 'p2Win'
var boardHTML = null

var turn = 1
var board = [
  ['yellow', 'yellow', null, null, null, null],
  ['red', null, null, null, null, null],
  ['red', null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null]
]

var render = function () {
  var html = ''
  for (var i = 0; i < board.length; i++) {
    html += '<div class="column">'
    for (var j = board[i].length - 1; j >= 0; j--) {
      html += '<div class="spot'
      if (board[i][j]) html += ' ' + board[i][j]
      html += '"></div>'
    }
    html += '</div>'
  }
  boardHTML.innerHTML = html
}

var init = function () {
  boardHTML = document.getElementById('board')
  render()
}

window.onload = init
