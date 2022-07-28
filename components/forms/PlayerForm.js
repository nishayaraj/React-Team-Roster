import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createPlayer, updatePlayer } from '../../api/playerData';
import { getTeams } from '../../api/teamData';

const initialState = {
  name: '',
  position: '',
  imageUrl: '',
};

function PlayerForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [teams, setTeams] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getTeams(user.uid).then(setTeams);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updatePlayer(formInput).then(() => router.push('/players'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createPlayer(payload).then(() => {
        router.push('/players');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">
        {obj.firebaseKey ? 'Update' : 'Create'}
        Player
      </h2>

      <FloatingLabel
        controlId="floatingInput1"
        label="Player Name"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="Enter Full Name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput2"
        label="Position"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="Enter Player Position"
          name="position"
          value={formInput.position}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingSelect"
        label="Team"
      >
        <Form.Select
          aria-label="Team"
          name="team_id"
          onChange={handleChange}
          className="mb-3"
          required
        >
          <option value="">Select a Team</option>
          {teams.map((team) => (
            <option key={team.firebaseKey} value={team.firebaseKey} selected={obj.team_id === team.firebaseKey}>
              {team.name}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput2"
        label="Player Image"
        className="mb-3"
      >
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="imageUrl"
          value={formInput.imageUrl}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Player</Button>
    </Form>
  );
}

PlayerForm.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    name: PropTypes.string,
    position: PropTypes.string,
    team_id: PropTypes.string,
    imageUrl: PropTypes.string,
  }),
};

PlayerForm.defaultProps = {
  obj: initialState,
};

export default PlayerForm;
