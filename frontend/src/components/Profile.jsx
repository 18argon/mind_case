import { useHistory } from 'react-router-dom'

export default function Profile({ user }) {
  const history = useHistory();

  const handleEditClick = (e) => {
    e.preventDefault();
    history.push('/users/profile/edit');
  }

  return (
    <div>
      <h1>Perfil</h1>
      <button onClick={handleEditClick}>Editar</button>
      <figure className="">
        <img style={{ width: "128px" }} src={`${process.env.REACT_APP_BACKEND_URL}/${user.image.path}`}
             alt="Imagem de perfil atual"/>
      </figure>
      <p>Nome completo: {user.fullName}</p>
      <p>CPF: {user.cpf}</p>
      <p>E-mail: {user.email}</p>
    </div>
  )
}
