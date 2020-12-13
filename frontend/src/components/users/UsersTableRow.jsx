import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import ToggleButton from './ToggleButton';

export default function UsersTableRow({ id, fullName, email, cpf, accessLevel }) {
  const history = useHistory();
  const [ activated, setActivated ] = useState(accessLevel !== 0)

  const handleToggle = (e) => {
    e.preventDefault();

    const requestOptions = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    };

    axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/users/${id}/activated`,
        {},
        requestOptions,
      )
      .then(request => request.data)
      .then(result => {
        if (result.success) {
          setActivated(result.message === "activated")
        }
      })
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    history.push(`/users/${id}/edit`)
  }

  return (
    <tr>
      <td>{fullName}</td>
      <td>{email}</td>
      <td>{cpf}</td>
      <td>
        <button onClick={handleEditClick}>Editar</button>
        <ToggleButton activated={activated} handleClick={handleToggle}/>
      </td>
    </tr>
  )
};
