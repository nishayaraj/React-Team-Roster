/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewTeamDetails } from '../../api/mergedData';
import PlayerCard from '../../components/PlayerCard';

export default function ViewTeam() {
  const [teamDetails, setTeamDetails] = useState({});
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  // TODO: make call to API layer to get the data
  useEffect(() => {
    viewTeamDetails(firebaseKey).then(setTeamDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="text-white ms-5 details">
        <h5>
          {teamDetails.name}
          {teamDetails.public ? 'public' : 'private'}
        </h5>
        {teamDetails.players?.map((player) => (
          <PlayerCard
            key={player.firebaseKey}
            playerObj={player}
            onUpdate={() => {
              viewTeamDetails(firebaseKey).then(setTeamDetails);
            }}
          />
        ))}
        <hr />
      </div>
    </div>
  );
}
