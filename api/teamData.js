import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// FIXME:  GET ALL TEAMS
const getTeams = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/teams.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

// FIXME: CREATE Team
const createTeam = (teamObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/teams.json`, teamObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/teams/${response.data.name}.json`, payload)
        .then(() => {
          getTeams(teamObj.uid).then((data) => resolve(data));
        });
    }).catch(reject);
});

const getSingleTeam = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/teams/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

// FIXME: DELETE Team
const deleteSingleTeam = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/teams/${firebaseKey}.json`)
    .then(() => {
      getTeams(uid).then((teamsArray) => resolve(teamsArray));
    })
    .catch((error) => reject(error));
});

// FIXME: UPDATE team
const updateTeam = (teamObj) => new Promise((resolve, reject) => {
  console.warn(teamObj);
  axios.patch(`${dbUrl}/teams/${teamObj.firebaseKey}.json`, teamObj)
    .then(() => getTeams().then((data) => {
      console.warn(data);
      resolve(data);
    }))
    .catch((error) => reject(error));
});

// TODO: GET A SINGLE Teams Players
const getTeamPlayers = (teamId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/teams.json?orderBy="team_id"&equalTo="${teamId}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

export {
  getTeams,
  createTeam,
  getSingleTeam,
  deleteSingleTeam,
  updateTeam,
  getTeamPlayers,
};
