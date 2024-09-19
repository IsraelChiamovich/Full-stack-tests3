var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as api from './api.js';
const playerSearchForm = document.getElementById('player-search-form');
const positionSelect = document.getElementById('position');
const playerSearchResultsTable = document.getElementById('player-search-results');
const pointsInput = document.getElementById('points');
const twoPercentInput = document.getElementById('fgp');
const threePercentInput = document.getElementById('tpp');
const pointsOutput = document.getElementById('points-output');
const twoPercentOutput = document.getElementById('fgp-output');
const threePercentOutput = document.getElementById('tpp-output');
[pointsInput, twoPercentInput, threePercentInput].forEach((input) => {
    input.addEventListener('input', () => {
        pointsOutput.textContent = pointsInput.value;
        twoPercentOutput.textContent = `${twoPercentInput.value}%`;
        threePercentOutput.textContent = `${threePercentInput.value}%`;
    });
});
playerSearchForm.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const searchCriteria = {
        position: positionSelect.value,
        points: parseInt(pointsInput.value),
        twoPercent: parseInt(twoPercentInput.value),
        threePercent: parseInt(threePercentInput.value),
    };
    try {
        const players = yield api.getPlayersBySearch(searchCriteria.position, searchCriteria.points, searchCriteria.twoPercent, searchCriteria.threePercent);
        displayPlayers(players);
    }
    catch (error) {
        console.error('Error fetching players:', error);
    }
}));
function displayPlayers(players) {
    const tbody = playerSearchResultsTable.querySelector('tbody');
    tbody.innerHTML = '';
    players.forEach((player) => {
        const row = document.createElement('tr');
        const playerNameCell = document.createElement('td');
        const positionCell = document.createElement('td');
        const pointsCell = document.createElement('td');
        const twoPercentCell = document.createElement('td');
        const threePercentCell = document.createElement('td');
        const actionCell = document.createElement('td');
        playerNameCell.textContent = player.playerName;
        positionCell.textContent = player.position;
        pointsCell.textContent = player.points.toString();
        twoPercentCell.textContent = `${player.twoPercent}%`;
        threePercentCell.textContent = `${player.threePercent}%`;
        const addButton = document.createElement('button');
        const playerFirstName = player.playerName.includes(' ') ? player.playerName.split(' ')[0] : player.playerName;
        addButton.textContent = `Add ${playerFirstName} to team`;
        addButton.classList.add('add-player');
        actionCell.appendChild(addButton);
        addButton.addEventListener('click', () => addPlayerToMyTeam(player));
        row.appendChild(playerNameCell);
        row.appendChild(positionCell);
        row.appendChild(pointsCell);
        row.appendChild(twoPercentCell);
        row.appendChild(threePercentCell);
        row.appendChild(actionCell);
        tbody.appendChild(row);
    });
}
function addPlayerToMyTeam(player) {
    let playerDetails;
    switch (player.position) {
        case 'PG':
            playerDetails = document.getElementById('my-pg-details');
            break;
        case 'SG':
            playerDetails = document.getElementById('my-sg-details');
            break;
        case 'SF':
            playerDetails = document.getElementById('my-sf-details');
            break;
        case 'PF':
            playerDetails = document.getElementById('my-pf-details');
            break;
        case 'C':
            playerDetails = document.getElementById('my-c-details');
            break;
        default:
            console.error('Invalid position:', player.position);
            return;
    }
    if (playerDetails) {
        playerDetails.innerHTML = '';
        const playerInfo = [
            `Name: ${player.playerName}`,
            `Position: ${player.position}`,
            `Points: ${player.points}`,
            `FG%: ${player.twoPercent}%`,
            `3P%: ${player.threePercent}%`
        ];
        playerInfo.forEach((info) => {
            const p = document.createElement('p');
            p.textContent = info;
            playerDetails.appendChild(p);
        });
    }
}
// async function saveTeam(): Promise<void> {
//     const selectedPlayers = {
//         PG: document.getElementById('my-pg-details')?.textContent || '',
//         SG: document.getElementById('my-sg-details')?.textContent || '',
//         SF: document.getElementById('my-sf-details')?.textContent || '',
//         PF: document.getElementById('my-pf-details')?.textContent || '',
//         C: document.getElementById('my-c-details')?.textContent || '',
//     };
//     try {
//         await api.addTeam({ players: playersArray });
//         alert('Team saved successfully!');
//     } catch (error) {
//         alert('Error saving team:', error);
//     }
// }
// document.getElementById('save-team')?.addEventListener('click', saveTeam);
