import { Bombs } from './bombs.js';
export class Board extends Bombs {
  constructor(width, height) {
    super();
    this.squares = [];
    this.width = width;
    this.height = height;
    this.flags = 0;
    this.isGameOver = false;
    this.bombsArr = Array(parseInt(this.bombAmount)).fill('bomb');
    this.emptyArr = Array(
      this.width * this.width - parseInt(this.bombAmount)
    ).fill('valid');
    this.gameArr = this.emptyArr.concat(this.bombsArr);
    this.shuffleArr = this.gameArr.sort(() => Math.random() - 0.5);
    // this.createBoard.bind(this);
  }

  click(square) {
    // console.log(square);
    let currentId = square.id;
    if (this.isGameOver) return;
    if (
      square.classList.contains('checked') ||
      square.classList.contains('flag')
    )
      return;

    if (square.classList.contains('bomb')) {
      this.gameOver(square);
    } else {
      let total = square.getAttribute('data');
      if (total != 0) {
        square.classList.add('checked');
        square.innerHTML = total;
        return;
      }
      this.checkSquare(square, currentId);
      square.classList.add('checked');
    }
  }

  gameOver(square) {
    this.isGameOver = true;
    this.squares.forEach((square) => {
      if (square.classList.contains('bomb')) {
        console.log();
        square.innerHTML = '&#128163;';
      }
    });
  }

  checkForWin() {
    let matches = 0;
    for (let i = 0; i < this.squares.length; i++) {
      if (
        this.squares[i].classList.contains('flag') &&
        this.squares[i].classList.contains('bomb')
      ) {
        matches++;
      }
      if (matches === this.bombAmount) {
        // matches++;
        console.log('You win!');
        this.isGameOver = true;
      }
    }
  }

  addFlag(square) {
    if (this.isGameOver) return;
    if (!square.classList.contains('checked') && this.flags < this.bombAmount) {
      if (!square.classList.contains('flag')) {
        square.classList.add('flag');
        square.innerHTML = '&#128681';
        this.flags++;
        this.checkForWin();
      } else {
        square.classList.remove('flag');
        square.innerHTML = '';
        this.flags--;
      }
    }
  }

  //rescursion neiboring square when click
  checkSquare(square, currentId) {
    const isLeftEdge = currentId % this.width === 0;
    // let total = 0;
    const isRightEdge = currentId % this.width === this.width - 1;
    setTimeout(() => {
      if (currentId > 0 && !isLeftEdge) {
        const newId = this.squares[parseInt(currentId) - 1].id;
        const newSquare = document.getElementById(newId);
        this.click(newSquare);
      }
      if (currentId > 9 && !isRightEdge) {
        const newId = this.squares[parseInt(currentId) + 1 - this.width].id;
        const newSquare = document.getElementById(newId);
        this.click(newSquare);
      }
      if (currentId > 10) {
        const newId = this.squares[parseInt(currentId) - this.width].id;
        const newSquare = document.getElementById(newId);
        this.click(newSquare);
      }
      if (currentId > 11 && !isLeftEdge) {
        const newId = this.squares[parseInt(currentId) - 1 - this.width].id;
        const newSquare = document.getElementById(newId);
        this.click(newSquare);
      }
      if (currentId < 98 && !isRightEdge) {
        const newId = this.squares[parseInt(currentId) + 1].id;
        const newSquare = document.getElementById(newId);
        this.click(newSquare);
      }
      if (currentId < 90 && !isLeftEdge) {
        const newId = this.squares[parseInt(currentId) - 1 + this.width].id;
        const newSquare = document.getElementById(newId);
        this.click(newSquare);
      }
      if (currentId < 88 && !isRightEdge) {
        const newId = this.squares[parseInt(currentId) + 1 + this.width].id;
        const newSquare = document.getElementById(newId);
        this.click(newSquare);
      }
      if (currentId < 89) {
        const newId = this.squares[parseInt(currentId) + this.width].id;
        const newSquare = document.getElementById(newId);
        this.click(newSquare);
      }
    }, 10);
  }

  createBoard() {
    // console.log(this.shuffleArr, this.squares);
    const grid = document.querySelector('.grid');
    for (let i = 0; i < this.width * this.width; i++) {
      const square = document.createElement('div');
      square.setAttribute('id', i);
      grid.appendChild(square);
      square.classList.add(this.shuffleArr[i]);
      this.squares.push(square);

      //normal click
      square.addEventListener('click', (e) => {
        this.click(square);
      });

      //add flag crt or left click
      square.oncontextmenu = (e) => {
        e.preventDefault();
        this.addFlag(square);
      };
    }

    //add num
    for (let i = 0; i < this.squares.length; i++) {
      const isLeftEdge = i % this.width === 0;
      let total = 0;
      const isRightEdge = i % this.width === this.width - 1;
      if (this.squares[i].classList.contains('valid')) {
        if (
          i > 0 &&
          !isLeftEdge &&
          this.squares[i - 1].classList.contains('bomb')
        )
          total++;

        if (
          i > 9 &&
          !isRightEdge &&
          this.squares[i + 1 - this.width].classList.contains('bomb')
        )
          total++;

        if (i > 10 && this.squares[i - this.width].classList.contains('bomb'))
          total++;

        if (
          i > 11 &&
          !isLeftEdge &&
          this.squares[i - 1 - this.width].classList.contains('bomb')
        )
          total++;

        if (
          i < 98 &&
          !isRightEdge &&
          this.squares[i + 1].classList.contains('bomb')
        )
          total++;

        if (
          i < 90 &&
          !isLeftEdge &&
          this.squares[i - 1 + this.width].classList.contains('bomb')
        )
          total++;

        if (
          i < 88 &&
          !isRightEdge &&
          this.squares[i + 1 + this.width].classList.contains('bomb')
        )
          total++;

        if (i < 89 && this.squares[i + this.width].classList.contains('bomb'))
          total++;
        this.squares[i].setAttribute('data', total);
        // console.log(this.squares[i]);
      }
    }
  }
}
