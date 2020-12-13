import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ToggleButton from './ToggleButton';
import { userService } from "../../services";

export default function UsersTableRow({ id, fullName, email, cpf, accessLevel }) {
  const history = useHistory();
  const [ activated, setActivated ] = useState(accessLevel !== 0)

  const handleToggle = (e) => {
    e.preventDefault();
    userService.toggleUserAccessLevel(id)
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
        <div className="buttons">
          <Link className="button is-small" to={`/users/${id}/edit`}>Editar</Link>
          <ToggleButton activated={activated} handleClick={handleToggle}/>
        </div>
      </td>
    </tr>
  )
};
