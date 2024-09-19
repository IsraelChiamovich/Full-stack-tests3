import * as api from './api.js';

const playerSearchForm = document.getElementById('player-search-form') as HTMLFormElement;
const positionSelect = document.getElementById('position') as HTMLSelectElement;
const playerSearchResultsTable = document.getElementById('player-search-results') as HTMLTableElement;
const pointsInput = document.getElementById('points') as HTMLInputElement;
const twoPercentInput = document.getElementById('fgp') as HTMLInputElement;
const threePercentInput = document.getElementById('tpp') as HTMLInputElement;
const pointsOutput = document.getElementById('points-output') as HTMLDivElement;
const twoPercentOutput = document.getElementById('fgp-output') as HTMLDivElement;
const threePercentOutput = document.getElementById('tpp-output') as HTMLDivElement;

[pointsInput, twoPercentInput, threePercentInput].forEach((input: HTMLInputElement) => {
    input.addEventListener('input', () => {
        pointsOutput.textContent = pointsInput.value;
        twoPercentOutput.textContent = `${twoPercentInput.value}%`;
        threePercentOutput.textContent = `${threePercentInput.value}%`;
    });
});

playerSearchForm.addEventListener('submit', async (e: Event) => {
    e.preventDefault();

    const searchCriteria = {
        position: positionSelect.value,
        points: parseInt(pointsInput.value),
        twoPercent: parseInt(twoPercentInput.value),
        threePercent: parseInt(threePercentInput.value),
    };

    try {
        const players: api.Player[] = await api.getPlayersBySearch(
            searchCriteria.position,
            searchCriteria.points,
            searchCriteria.twoPercent,
            searchCriteria.threePercent
        );
        displayPlayers(players);
    } catch (error) {
        console.error('Error fetching players:', error);
    }
});

function displayPlayers(players: api.Player[]): void {
    const tbody = playerSearchResultsTable.querySelector('tbody')!;
    tbody.innerHTML = ''; 

    players.forEach((player: api.Player) => {
        const row: HTMLTableRowElement = document.createElement('tr');

        const playerNameCell: HTMLTableCellElement = document.createElement('td');
        const positionCell: HTMLTableCellElement = document.createElement('td');
        const pointsCell: HTMLTableCellElement = document.createElement('td');
        const twoPercentCell: HTMLTableCellElement = document.createElement('td');
        const threePercentCell: HTMLTableCellElement = document.createElement('td');
        const actionCell: HTMLTableCellElement = document.createElement('td');

        playerNameCell.textContent = player.playerName;
        positionCell.textContent = player.position;
        pointsCell.textContent = player.points.toString();
        twoPercentCell.textContent = `${player.twoPercent}%`;
        threePercentCell.textContent = `${player.threePercent}%`;

        const addButton: HTMLButtonElement = document.createElement('button');
        const playerFirstName: string = player.playerName.includes(' ') ? player.playerName.split(' ')[0] : player.playerName;
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

function addPlayerToMyTeam(player: api.Player): void {
    let playerDetails: HTMLDivElement | null;

    switch (player.position) {
        case 'PG':
            playerDetails = document.getElementById('my-pg-details') as HTMLDivElement;
            break;
        case 'SG':
            playerDetails = document.getElementById('my-sg-details') as HTMLDivElement;
            break;
        case 'SF':
            playerDetails = document.getElementById('my-sf-details') as HTMLDivElement;
            break;
        case 'PF':
            playerDetails = document.getElementById('my-pf-details') as HTMLDivElement;
            break;
        case 'C':
            playerDetails = document.getElementById('my-c-details') as HTMLDivElement;
            break;
        default:
            console.error('Invalid position:', player.position);
            return;
    }

    if (playerDetails) {
        playerDetails.innerHTML = ''; 

        const playerInfo: string[] = [
            `Name: ${player.playerName}`,
            `Position: ${player.position}`,
            `Points: ${player.points}`,
            `FG%: ${player.twoPercent}%`,
            `3P%: ${player.threePercent}%`
        ];

        playerInfo.forEach((info: string) => {
            const p: HTMLParagraphElement = document.createElement('p');
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