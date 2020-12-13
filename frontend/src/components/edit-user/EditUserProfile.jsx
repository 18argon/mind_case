import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import EditUserForm from './EditUserForm';
import { getBearerToken } from '../../services/auth-service';
import { userService } from "../../services";

export default function EditUserProfile() {
  const history = useHistory();
  const [ user, setUser ] = useState(undefined);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    const fetchUser = () => {
      const requestOptions = {
        headers: {
          Authorization: getBearerToken(),
        },
      };

      userService.fetchProfile()
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
  }, []);

  const onSubmit = ({ fullName, newAvatar }) => {
    userService.updateProfile(fullName, newAvatar)
      .then((result) => {
        if (result.success) {
          history.push("/");
        }
      });
  }


  return (
    <div>
      <h1>Editar Perfil</h1>
      {!loading && <EditUserForm onSubmit={onSubmit} {...user} imagePath={user.image.path}/>}
    </div>
  );
};
