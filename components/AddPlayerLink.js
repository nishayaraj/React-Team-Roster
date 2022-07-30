/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';

function AddPlayerLink() {
  const router = useRouter();

  const routeToNewPlayerPage = () => router.push('/players/new');

  return (
    <Button
      variant="primary"
      onClick={routeToNewPlayerPage}
    >
      Add a new player
    </Button>
  );
}

export default AddPlayerLink;
