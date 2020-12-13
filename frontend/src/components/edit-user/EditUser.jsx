import { useState, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import EditUserForm from './EditUserForm';
import { userService } from "../../services";
import Header from '../Header';

export default function EditUser() {
  const match = useRouteMatch();
  const history = useHistory();
  const [ user, setUser ] = useState(undefined);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    const fetchUser = () => {
      const id = match.params.id;

      userService.fetchUser(id)
        .then(result => {
          if (result.success) {
            setUser(result.data);
          }
          setLoading(false);
        })
        .catch(err => console.log(err));
    };

    fetchUser();
  }, [ match ]);

  const onSubmit = ({ fullName, newAvatar }) => {
    userService.updateUser(user.id, fullName, newAvatar)
      .then((result) => {
        if (result.success) {
          history.push("/");
        }
      });
  }
  return (
    <>
      <Header fullName={user ? user.fullName : ''}
              imageSrc={user ? `${process.env.REACT_APP_BACKEND_URL}/${user.image.path}` : ''}/>
      <div className="container">
        {!loading && (
          <div className="box">
            <h1 className="is-size-3">Editar Usuário</h1>
            <EditUserForm onSubmit={onSubmit} {...user} imagePath={user.image.path}/>
          </div>
        )}
      </div>
    </>
  );
};
