var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const BASE_url = 'https://nbaserver-q21u.onrender.com/api/';
function getPlayersBySearch(position, points, twoPercent, threePercent) {
    return __awaiter(this, void 0, void 0, function* () {
        const requestData = {
            position,
            points,
            twoPercent,
            threePercent
        };
        try {
            const response = yield fetch(`${BASE_url}filter`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });
            const players = yield response.json();
            const validYears = [2022, 2023, 2024];
            const filteredPlayers = players.filter(player => player.season.some(year => validYears.includes(year)));
            return filteredPlayers;
        }
        catch (error) {
            console.error('Error fetching players:', error);
            throw error;
        }
    });
}
function getAllTeams() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${BASE_url}GetAllTeams`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const players = yield response.json();
            return players;
        }
        catch (error) {
            console.error('Error fetching players:', error);
            throw error;
        }
    });
}
function addTeam(players) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${BASE_url}AddTeam`, {
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
    });
}
export { getPlayersBySearch, getAllTeams, addTeam };
