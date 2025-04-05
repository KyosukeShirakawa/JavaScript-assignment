import { board, technologies} from './index.js';
import { renderAndUpdateTimer, renderTable } from './interface.js';

export function random(min, max) {
  return Math.floor(Math.random() * (max-min + 1)+min )
}

export function random468() {
  const nums = [4,6,8];

  return nums[random(0, nums.length-1)];
}

export function generateRandomTech(min,max) {
  return Array.from(technologies)[random(min, max)]; 
}

export function getHigherTech(tech) {
  const category = technologies.find(t => t.steps.some(step => step.name === tech.name));
  const currentIndex = category.steps.findIndex(step => step.name === tech.name);

  return category.steps[currentIndex+1];
}

export function handleClickCell(e) {
  const j = e.target.cellIndex;
  const tr = e.target.parentNode;
  const i = tr.rowIndex;
  board[i][j] = generateRandomTech(0, technologies.length-1).steps[0];
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