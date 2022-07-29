/* eslint-disable no-else-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getPlayers } from '../../api/playerData';
import { useAuth } from '../../utils/context/authContext';
import PlayerCard from '../../components/PlayerCard';
import SearchComponent from '../../components/SearchComponent';
import AddPlayerLink from '../../components/AddPlayerLink';

function Players() {
  const { user } = useAuth();

  const [players, setPlayers] = useState([]);
  const [playerSearchName, setPlayerSearchName] = useState('');

  const filterPlayers = (searchName) => {
    console.warn(playerSearchName);
    setPlayerSearchName(searchName);
  };

  const getAllThePlayers = () => {
    getPlayers(user.uid)
      .then((playerData) => {
        setPlayers(playerData);
      });
  };

  useEffect(() => {
    getAllThePlayers();
  }, [user]);

  const renderPlayers = () => {
    if (players.length > 1) {
      return players.map((player) => {
        if (!playerSearchName) {
          return (
            <PlayerCard
              key={player.firebaseKey}
              playerObj={player}
              onUpdate={getAllThePlayers}
            />
          );
        }

        if (playerSearchName
            && (player.name.toLowerCase().indexOf(playerSearchName.toLowerCase())
            !== -1)) {
          return (
            <PlayerCard
              key={player.firebaseKey}
              playerObj={player}
              onUpdate={getAllThePlayers}
            />
          );
        } else return null;
      });
    }
    return <div style={{ margin: '20px' }}><AddPlayerLink /> </div>;
  };

  useEffect(() => {
    renderPlayers();
  }, [playerSearchName]);

  return (
    <div className="text-center my-4">
      <h1>The Tributes</h1>
      <SearchComponent onSearch={filterPlayers} />
      <div className="players-cards-container">
        {renderPlayers()}
      </div>
    </div>

  );
}

export default Players;
