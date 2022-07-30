import { getTeamPlayers, getSingleTeam, deleteSingleTeam } from './teamData';
import { getSinglePlayer, deletePlayer } from './playerData';

const viewPlayerDetails = (playerFirebaseKey) => new Promise((resolve, reject) => {
  getSinglePlayer(playerFirebaseKey)
    .then((playerObject) => {
      getSingleTeam(playerObject.team_id)
        .then((teamObject) => {
          resolve({ teamObject, ...playerObject });
        });
    }).catch((error) => reject(error));
});

const viewTeamDetails = (teamFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleTeam(teamFirebaseKey), getTeamPlayers(teamFirebaseKey)])
    .then(([teamObject, teamPlayersArray]) => {
      resolve({ ...teamObject, players: teamPlayersArray });
    }).catch((error) => reject(error));
});

const deleteTeamPlayers = (teamId) => new Promise((resolve, reject) => {
  getTeamPlayers(teamId).then((playersArray) => {
    console.warn(playersArray, 'Team Players');
    const deletePlayerPromises = playersArray.map((player) => deletePlayer(player.firebaseKey));

    Promise.all(deletePlayerPromises).then(() => {
      deleteSingleTeam(teamId).then(resolve);
    });
  }).catch((error) => reject(error));
});

const deleteTeamAndPlayers = (teamFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([deleteSingleTeam(teamFirebaseKey), deleteTeamPlayers(teamFirebaseKey)])
    .then(resolve).catch((error) => reject(error));
});

export { viewPlayerDetails, viewTeamDetails, deleteTeamAndPlayers };
