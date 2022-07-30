import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deletePlayer } from '../api/playerData';

function PlayerCard({ playerObj, onUpdate }) {
  const deleteThisPlayer = () => {
    if (window.confirm(`Delete ${playerObj.name}?`)) {
      deletePlayer(playerObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card
      className="player-card"
      style={{ color: 'black' }}
    >
      <Card.Img variant="top" src={playerObj.imageUrl} alt={playerObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{playerObj.name}</Card.Title>
        <p className="card-text bold">{playerObj.position }</p>
        <Link href={`/players/${playerObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/players/edit/${playerObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisPlayer} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

PlayerCard.propTypes = {
  playerObj: PropTypes.shape({
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    position: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PlayerCard;
