import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createTeam, updateTeam } from '../../api/teamData';

// used for default values in form
const initialState = {
  name: '',
  imageUrl: '',
  public: false,
};

function TeamForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
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
      updateTeam(formInput)
        .then(() => router.push(('/teams')));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createTeam(payload).then(() => {
        router.push('/teams');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Team</h2>
      <FloatingLabel
        controlId="floatingInput1"
        label="Team Name"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="Enter District Name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput2"
        label="District Logo"
        className="mb-3"
      >
        <Form.Control
          type="imageUrl"
          placeholder="Enter an image url"
          name="imageUrl"
          value={formInput.imageUrl}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="public"
        name="public"
        label="Public ?"
        checked={formInput.sale}
        onChange={(e) => setFormInput((prevState) => ({
          ...prevState,
          favorite: e.target.checked,
        }))}
      />
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Team</Button>
    </Form>

  );
}

TeamForm.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    public: PropTypes.bool,
  }),
};

TeamForm.defaultProps = {
  obj: initialState,
};

export default TeamForm;
