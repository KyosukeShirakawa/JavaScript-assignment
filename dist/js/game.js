import { renderAndUpdateTimer, renderScores, renderTable, renderUserInfo } from './interface.js';
import { levels, evolutions} from './evolutions.js';

export let username;
export let level = 'easy';
export let time;
export let score = 0;
export let techScore = {
  "Scripting Evolution": 0,
  "Styling Technologies": 0,
  "Markup Languages": 0,
  "C Language Evolution": 0,
  "IDE Evolution": 0,
  "Audio Formats": 0,
  "Video Formats": 0,
  "Image Formats": 0,
  "CMS Evolution": 0,
  "Database Evolution": 0,
};

export let technologies;
export let board = [];

function random(min, max) {
  return Math.floor(Math.random() * (max-min + 1)+min )
}

function random468() {
  const nums = [4,6,8];

  return nums[random(0, nums.length-1)];
}

export function initData() {
  username = document.querySelector('#usernameInput').value;
  level = document.querySelector('#difficultyInput').value;
  technologies = evolutions.filter(e => e.difficulty === level
  );
  time = new Date().getTime() + (1000 * 60 * levels[level].time)
  initBoard();
}

function initBoard() {
  const {cols, rows} = levels[level];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push("");
    }
    board.push(row)
  }
  populateCells();
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

function generateRandomTech(min,max) {
  return Array.from(technologies)[random(min, max)]; 
}

function getHigherTech(tech) {
  const category = technologies.find(t => t.steps.some(step => step.name === tech.name));
  const currentIndex = category.steps.findIndex(step => step.name === tech.name);

  const lastStep = category.steps[category.steps.length-1];
  if(lastStep===category.steps[currentIndex+1]) {
    updateScores(category);
    return null;
  }

  return category.steps[currentIndex+1];
}

function updateScores(category) {
  score += levels[level].points;

  if(techScore.hasOwnProperty(category.name)) {
    techScore[category.name] += levels[level].points;

    renderScores();
  }
}

export function handleClickCell(e) {
  const j = e.target.cellIndex;
  const tr = e.target.parentNode;
  const i = tr.rowIndex;
  board[i][j] = generateRandomTech(0, technologies.length-1).steps[0];
}

export function handleClickSubmit() {
  document.querySelector('#start-div').hidden = true;
  document.querySelector('#game-div').hidden = false;
  initData();
  renderTable();
  renderAndUpdateTimer();
  renderUserInfo();
}

export function handleClickDrawBtn() {
  const emptyCellIndexes = board.map((row,i)=> row.map ( (cell, j) => {
    if(!cell) {
      return {i, j};
    }
    return null;
  })).flat().filter(cell => cell);
  if(emptyCellIndexes.length) {
    const { i, j } = emptyCellIndexes[random(0, emptyCellIndexes.length - 1)];
    board[i][j] = generateRandomTech(0, technologies.length-1).steps[0];
    renderTable();
  } else {
    return null;
  }
}

let draggedElement;
let startCellIndex;

export function handleDragStart(e) {
  draggedElement = e.target;

  const startCell = e.target.closest('td');
  const rowIndex = startCell.parentNode.rowIndex;
  const colIndex = startCell.cellIndex;
  startCellIndex = {rowIndex, colIndex};
}
export function handleDrop(e) {
  if (draggedElement.src === e.target.src) {
    const j = e.target.parentNode.cellIndex;
    const tr = e.target.parentNode.parentNode;
    const i = tr.rowIndex;
    const higherTech = getHigherTech(board[i][j])
    board[i][j] = higherTech;

    e.target.appendChild(draggedElement);

    draggedElement.classList.remove("dragging");
    draggedElement = null;

    const {rowIndex, colIndex} = startCellIndex;
    board[rowIndex][colIndex] = "";
  }
}

let timer;
let currentCell = null;
export function handleMouseover(e) {
  const td = e.target.closest('td');
  if(td && td.querySelector('img')) {
    if(e.target === currentCell) return;
    currentCell = td;
    // TODO setting hover for 3 sec
    // BUG hovering over to the next cell shows previous render
    // BUG hover doesnt show tooltip for the first cell hover after refresh

    clearTimeout(timer);
    timer = setTimeout(() => {
      const cell = e.target.closest('td');
      const rowIndex = cell.parentNode.rowIndex;
      const colIndex = cell.cellIndex;
      const step = board[rowIndex][colIndex];

      const tooltip = document.querySelector('#tooltip');
      if(step) {
        const imgRect = e.target.getBoundingClientRect();
        tooltip.style.left = `${imgRect.left + window.scrollX + e.target.offsetWidth / 2 - (tooltip.offsetWidth / 2) -10}px`;
        tooltip.style.top = `${imgRect.bottom + window.scrollY + 5}px`;

        tooltip.innerHTML = `
        <h2 class="text-black">${technologies.find(tech => tech.steps.includes(step)).name}</h2>
        <p class="text-black pb-2">${technologies.find(tech => tech.steps.includes(step)).description}</p>
        <img class="mb-2" src="./assets/evolutions/${technologies.find(tech => tech.steps.includes(step)).tooltip}" alt="${technologies.find(tech => tech.steps.includes(step)).name}">`

        // https://medium.com/@jazpersaldana_43178/basics-of-getboundingclientrect-bd6c382759d9

        tooltip.classList.add('visible');
      }
    }, 3000);
  }
}

export function handleMouseout(e) {
  const td = e.target.closest('td');
  if(td && e.target.querySelector('img')) {
    if(td.contains(e.relatedTarget)) return;
    clearTimeout(timer);
    const tooltip = document.querySelector('#tooltip');
    tooltip.classList.remove('visible');
  }
}