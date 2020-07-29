// document.addEventListener('DOMContentLoaded', () => {
//   const grid = document.querySelector('.grid');
//   let width = 10;

//   //create Board
// // });
import { Board } from './board.js';
var startBtn = document.getElementById('start');
startBtn.addEventListener('click', () => {
  const opt = document.getElementById('selectBoard');
  startGame(parseInt(opt.options[opt.selectedIndex].value));
});

function startGame(width) {
  //   let start = true;
  startBtn.hidden;
  //   const bomb = new Bombs(bombAmount);
  const start = new Board(width);
  start.createBoard();
}

// var startgame = ;
// console.log(startgame);
