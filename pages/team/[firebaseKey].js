/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePlayer } from '../../api/playerData';

export default function ViewPlayer() {
  const [playerDetails, setPlayerDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSinglePlayer(firebaseKey).then(setPlayerDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={playerDetails.imageUrl} alt={playerDetails.name} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {playerDetails.name}
        </h5>
        Player Position: {playerDetails.position}
      </div>
    </div>
  );
}
