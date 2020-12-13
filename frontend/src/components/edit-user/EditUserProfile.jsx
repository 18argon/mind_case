import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import EditUserForm from './EditUserForm';
import { getBearerToken } from '../../services/auth-service';
import { userService } from "../../services";
import Header from '../Header';

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
    <>
      <Header fullName={user ? user.fullName : ''}
              imageSrc={user ? `${process.env.REACT_APP_BACKEND_URL}/${user.image.path}` : ''}/>
      <div className="container">
        {!loading && (
          <div className="box">
            <h2 className="is-size-3">Editar Perfil</h2>

            <EditUserForm onSubmit={onSubmit} {...user} imagePath={user.image.path}/>
          </div>
        )}
      </div>
    </>
  );
};
