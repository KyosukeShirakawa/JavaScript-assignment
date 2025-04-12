import { renderTable, renderUserInfo, renderAndUpdateTimer, renderScores } from './interface.js';
import {initData, handleClickCell, handleClickDrawBtn, handleDrop, handleDragStart, handleMouseover, handleMouseout, handleClickSubmit, handleClickCompletedCell, handleClickBackToHomeBtn, handleRestartBtn } from './game.js';



document.addEventListener('click', (e) => {
  e.preventDefault();
  if(e.target.matches('#submit-btn')) {
    handleClickSubmit();
  }
  if(e.target.matches('td') && !e.target.querySelector('img')) {
    handleClickCell(e);
  }
  if(e.target.matches('#draw-button')) {
    handleClickDrawBtn();
  }
  if(e.target.closest('.completed')) {
    handleClickCompletedCell(e);
  }
  if(e.target.matches('#backBtn')) {
    handleClickBackToHomeBtn();
  }
  if(e.target.matches('#restartBtn')) {
    handleRestartBtn();
  }});

document.addEventListener('dragstart', (e) => {
  if(e.target.tagName === "IMG") {
    handleDragStart(e);
  }
});

document.addEventListener('dragover', (e) => {
  e.preventDefault();
});

document.addEventListener('drop', (e) => {
  e.preventDefault();
  handleDrop(e);
});


document.addEventListener('mouseover', (e) => {
  handleMouseover(e);
});

document.addEventListener('mouseout', (e) => {
  handleMouseout(e);
});


  initData();
  // renderTable();
  renderAndUpdateTimer();
  renderUserInfo();
  renderScores();