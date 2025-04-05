import { levels, evolutions} from './evolutions.js';
import { renderTable, renderUserInfo, renderTooltip } from './interface.js';
import { getHigherTech, handleClickCell, random, random468 } from './game.js';

export let username;
export let level;
export let time;
export let score;
export let technologies;
export let board = [];

const startDiv = document.querySelector('#start-div');
const gameDiv = document.querySelector('#game-div');


document.addEventListener('click', (e) => {
  e.preventDefault();
  if(e.target.matches('#submit-btn')) {
    startDiv.hidden = true;
    gameDiv.hidden = false;

    renderUserInfo();
    initData();
    renderTable();
    renderUserInfo();

  }

  if(e.target.matches('td') && !e.target.querySelector('img')) {
    handleClickCell(e);
    renderTable();
  }
});

let draggedElement;
let startCellIndex;

document.addEventListener('dragstart', (e) => {
  if(e.target.tagName === "IMG") {
    draggedElement = e.target;

    const startCell = e.target.closest('td');
    const rowIndex = startCell.parentNode.rowIndex;
    const colIndex = startCell.cellIndex;
    startCellIndex = {rowIndex, colIndex};
  }
});

document.addEventListener('dragover', (e) => {
  e.preventDefault();
})

document.addEventListener('drop', (e) => {
  e.preventDefault();
  if (draggedElement.src === e.target.src) {
    const j = e.target.parentNode.cellIndex;
    const tr = e.target.parentNode.parentNode;
    const i = tr.rowIndex;

    board[i][j] = getHigherTech(board[i][j]);
    e.target.appendChild(draggedElement);

    draggedElement.classList.remove("dragging");
    draggedElement = null;

    const {rowIndex, colIndex} = startCellIndex;
    board[rowIndex][colIndex] = "";

    renderTable();
  }
})

document.addEventListener('mouseover', (e) => {
  if(e.target.matches('td') && e.target.querySelector('img')) {
    setTimeout(() => {
      const tooltip = document.querySelector('#tooltip');
      const cell = e.target.closest('td');
      const rowIndex = cell.parentNode.rowIndex;
      const colIndex = cell.cellIndex;
      const step = board[rowIndex][colIndex];

      tooltip.innerHTML = `
      <h2 class="text-black">${technologies.find(tech => tech.steps.includes(step)).name}</h2>
      <p class="text-black pb-2">${technologies.find(tech => tech.steps.includes(step)).description}</p>
      <img class="mb-2" src="./assets/evolutions/${technologies.find(tech => tech.steps.includes(step)).tooltip}" alt="${technologies.find(tech => tech.steps.includes(step)).name}">`

      const imgRect = e.target.getBoundingClientRect();

      tooltip.style.left = `${imgRect.left + window.scrollX + e.target.offsetWidth / 2 - tooltip.offsetWidth / 2}px`;
      tooltip.style.top = `${imgRect.bottom + window.scrollY}px`;
      tooltip.classList.add('visible');
    },3000)
  }
});

document.addEventListener('mouseout', (e) => {
  if(e.target.matches('td') && e.target.querySelector('img')) {
    const tooltip = document.querySelector('#tooltip');
    tooltip.classList.remove('visible');
  }
}, true);

function initData(e) {
  username = document.querySelector('#usernameInput').value;
  level = document.querySelector('#difficultyInput').value;
  technologies = evolutions.filter(e => e.difficulty === level
  );
  // TODO initilize timer, score

  initBoard();
  populateCells();
}

function initBoard() {
  const {cols, rows} = levels[level];
  board = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push("");
    }
    board.push(row)
  }
}

function populateCells() {
  const {cols, rows} = levels[level];
  let filled = 0;
  const n = random468();
  while (filled<n) {
    const i = random(0, rows-1);
    const j = random(0, cols-1);

    if (board[i][j] === "") {
      board[i][j] = technologies[Math.floor(Math.random() * technologies.length)].steps[0];
      filled++;
    }
  }
}

