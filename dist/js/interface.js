
import { username, level, time, score, board, technologies } from "./index.js";

const usernameSpan = document.querySelector('#username');
const difficultySpan = document.querySelector('#difficulty');
const timeSpan = document.querySelector('#time');
const scoreSpan = document.querySelector('#score');
const centerDiv = document.querySelector('#center');

export function renderUserInfo() {
  usernameSpan.innerHTML = `${username}`;
  difficultySpan.innerHTML = `${level}`;
  timeSpan.innerHTML = `${time}`;
  scoreSpan.innerHTML = `${score}`;
}



export function renderTable() {
  centerDiv.innerHTML = `
  <table id="grid">
    ${board.map(row =>`
      <tr>
        ${row.map(tech => `
          <td class="cell border-2 w-13 h-13">${tech ? `<img draggable="true" class="w-full h-full" src="assets/logos/${tech.img}" >` : ""}</td>
        `).join("")}
      </tr>
      `).join("")}
  </table>`;

  renderTooltip();

};

export function renderTooltip() {
  const tooltip = document.createElement('div');
  tooltip.id = 'tooltip';
  tooltip.className = 'bg-white p-4 max-w-100';
  document.body.appendChild(tooltip);
}
