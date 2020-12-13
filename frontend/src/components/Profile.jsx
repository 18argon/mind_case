import { useHistory } from 'react-router-dom'
import Header from './Header';
import UsersTable from './users/UsersTable';

export default function Profile({ fullName, cpf, email, image }) {
  const history = useHistory();

  const handleEditClick = (e) => {
    e.preventDefault();
    history.push('/users/profile/edit');
  }

  return (
    <>
      <Header fullName={fullName} imageSrc={`${process.env.REACT_APP_BACKEND_URL}/${image.path}`}/>
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-four-fifths">
            <div className="box">
              <div className="columns">
                <div className="column is-four-fifths">
                  <h1 className="is-size-3">Perfil</h1>
                </div>
                <div className="column ">
                  <button className="button is-success field-right" onClick={handleEditClick}>Editar</button>
                </div>
              </div>
              <figure className="">
                <img style={{ width: "128px" }} src={`${process.env.REACT_APP_BACKEND_URL}/${image.path}`}
                     alt="Imagem de perfil atual"/>
              </figure>
              <p><span className="has-text-weight-bold"> Nome completo: </span>{fullName}</p>
              <p><span className="has-text-weight-bold"> CPF: </span>{cpf}</p>
              <p><span className="has-text-weight-bold"> E-mail: </span>{email}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
