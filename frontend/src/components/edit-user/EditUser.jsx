import { useState, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import EditUserForm from './EditUserForm';
import { userService } from "../../services";

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
          console.log(result);
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
    <div>
      <h1>Editar Usuário</h1>
      {!loading && <EditUserForm onSubmit={onSubmit} {...user} imagePath={user.image.path}/>}
    </div>
  );
};
