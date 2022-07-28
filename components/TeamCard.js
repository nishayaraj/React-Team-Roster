import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleTeam } from '../api/teamData';

function TeamCard({ teamObj, onUpdate }) {
  const deleteThisTeam = () => {
    if (window.confirm(`Delete ${teamObj.name}?`)) {
      deleteSingleTeam(teamObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card
      className="team-card"
    >
      <Card.Img variant="top" src={teamObj.imageUrl} alt={teamObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{teamObj.name}</Card.Title>
        <p className="card-text bold">{teamObj.public}</p>
        <Link href={`/teams/${teamObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/teams/edit/${teamObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisTeam} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

TeamCard.propTypes = {
  teamObj: PropTypes.shape({
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    public: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default TeamCard;
