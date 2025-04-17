
import { username, level, score, board, techScore } from "./game.js";

export let time = new Date().getTime() + 10 * 1000; // 10 seconds from now

export function renderUserInfo() {
  const usernameSpan = document.querySelector('#username');
  const difficultySpan = document.querySelector('#difficulty');
  usernameSpan.innerHTML = `${username}`;
  difficultySpan.innerHTML = `${level}`;
}

export function renderScores() {
  const scoreSpan = document.querySelector('#score');
  const spans = document.querySelectorAll('.techScore');

  scoreSpan.innerHTML = `${score}`;

  Array.from(spans).map((span) => {
    const category = span.dataset.category;
    if(category && techScore.hasOwnProperty(category)) {
      span.innerHTML = techScore[category];
    }
  })
}


export function renderTable() {
  const table = document.querySelector('#grid');

  table.innerHTML = `
    ${board.map(row =>`
      <tr>
        ${row.map(cell => `
          <td class="cell border-2 w-13 h-13 ${cell.completed ? "completed" : ""}">${cell.tech ? `<img draggable="true" class="w-full h-full" src="assets/logos/${cell.tech.img}" >` : ""}</td>
        `).join("")}
      </tr>
      `).join("")}`;

  renderTooltip();

};

function renderTooltip() {
  const tooltip = document.createElement('div');
  tooltip.id = 'tooltip';
  tooltip.className = 'bg-white p-4 max-w-100';
  document.querySelector('#center').appendChild(tooltip);
}
