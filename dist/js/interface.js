
import { username, level, time, score, board } from "./index.js";

const usernameSpan = document.querySelector('#username');
const difficultySpan = document.querySelector('#difficulty');
const scoreSpan = document.querySelector('#score');
const centerDiv = document.querySelector('#center');

export function renderUserInfo() {
  usernameSpan.innerHTML = `${username}`;
  difficultySpan.innerHTML = `${level}`;
  scoreSpan.innerHTML = `${score}`;
}

export function renderAndUpdateTimer() {
  // https://how.dev/answers/how-to-create-a-countdown-timer-using-javascript

  const now = new Date().getTime();
  const timeLeft = time - now;
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / (1000));

  const timerSpan = document.querySelector('#timer');

  timerSpan.innerHTML = `${minutes}:${seconds}`;

  if(timeLeft > 0) {
    setTimeout(renderAndUpdateTimer, 1000);
  }
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

function renderTooltip() {
  const tooltip = document.createElement('div');
  tooltip.id = 'tooltip';
  tooltip.className = 'bg-white p-4 max-w-100';
  document.body.appendChild(tooltip);
}
