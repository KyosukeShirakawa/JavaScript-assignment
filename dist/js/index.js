import { renderTable, renderUserInfo, renderAndUpdateTimer, renderTechScores } from './interface.js';
import {initData, handleClickCell, handleClickDrawBtn, handleDrop, handleDragStart, handleMouseover, handleMouseout, handleClickSubmit } from './game.js';



document.addEventListener('click', (e) => {
  e.preventDefault();
  if(e.target.matches('#submit-btn')) {
    handleClickSubmit();
  }

  if(e.target.matches('td') && !e.target.querySelector('img')) {
    handleClickCell(e);
    renderTable();
  }
  if(e.target.matches('#draw-button')) {
    handleClickDrawBtn();
  }
});

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
  renderTable();
});


document.addEventListener('mouseover', (e) => {
  handleMouseover(e);
});

document.addEventListener('mouseout', (e) => {
  handleMouseout(e);
});


  initData();
  renderTable();
  renderAndUpdateTimer();
  renderUserInfo();