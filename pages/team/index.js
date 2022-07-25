/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getPlayers } from '../../api/playerData';
import { useAuth } from '../../utils/context/authContext';
import PlayerCard from '../../components/PlayerCard';

function Team() {
  const [team, setTeam] = useState([]);
  const { user } = useAuth();

  const getAllThePlayers = () => {
    getPlayers(user.uid)
      .then((playerData) => {
        setTeam(playerData);
      });
  };

  useEffect(() => {
    getAllThePlayers();
  }, [user]);

  return (

    <div className="text-center my-4">
      {team.length > 1 ? team.map((player) => (
        <PlayerCard
          key={player.firebaseKey}
          playerObj={player}
          onUpdate={getAllThePlayers}
        />
      )) : <div>team not found</div>}
    </div>

  );
}

export default Team;
