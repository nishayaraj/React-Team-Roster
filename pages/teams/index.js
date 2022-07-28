/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getTeams } from '../../api/teamData';
import { useAuth } from '../../utils/context/authContext';
import TeamCard from '../../components/TeamCard';

function Teams() {
  const [teams, setTeams] = useState([]);

  const { user } = useAuth();

  const getAllTheTeams = () => {
    getTeams(user.uid).then(setTeams);
  };

  useEffect(() => {
    getAllTheTeams();
  }, [user]);

  return (
    <div className="text-center my-4">
      <Link href="/teams" passHref>
        <h1>Teams</h1>
      </Link>
      <div className="d-flex flex-wrap">
        {teams.map((team) => (
          <TeamCard key={team.firebaseKey} teamObj={team} onUpdate={getAllTheTeams} />
        ))}
      </div>

    </div>
  );
}

export default Teams;
