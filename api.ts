const BASE_url = 'https://nbaserver-q21u.onrender.com/api/';

interface Player {
    playerName: string;
    position: string;
    points: number;
    twoPercent: number;
    threePercent: number;
    season: number[];
}

async function getPlayersBySearch(position: string, points: number, twoPercent: number, threePercent: number): Promise<Player[]>{
    const requestData = {
        position,
        points,
        twoPercent,
        threePercent
    };
    try{
        const response = await fetch(`${BASE_url}filter`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });
        const players: Player[] = await response.json();
        const validYears: number[] = [2022, 2023, 2024];
        const filteredPlayers: Player[] = players.filter(player => 
            player.season.some(year => validYears.includes(year))
        );
        return filteredPlayers;
    }
    catch (error) {
        console.error('Error fetching players:', error);
        throw error;
    }
}

async function getAllTeams(): Promise<Player[]>{
    try{
        const response = await fetch(`${BASE_url}GetAllTeams`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const players: Player[] = await response.json();
        return players;
    }
    catch (error) {
        console.error('Error fetching players:', error);
        throw error;
    }
}

async function addTeam(players: Player[]): Promise<void>{
    try{
        const response = await fetch(`${BASE_url}AddTeam`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(players)
        });
        return;
    }
    catch (error) {
        console.error('Error fetching players:', error);
        throw error;
    }
}

export {getPlayersBySearch, getAllTeams, addTeam, Player}