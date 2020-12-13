import { useState, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import axios from 'axios';
import EditUserForm from './EditUserForm';

export default function EditUser() {
  const match = useRouteMatch();
  const history = useHistory();
  const [ user, setUser ] = useState(undefined);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    const fetchUser = () => {
      const id = match.params.id;
      const requestOptions = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      };

      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/users/${id}`, requestOptions)
        .then(request => request.data)
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
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("avatar", newAvatar[0]);

    const requestOptions = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    };
    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/users/${user.id}`, formData, requestOptions)
      .then((response) => response.data)
      .then((result) => {
        if (result.success) {
          history.push("/");
        }
      });
  }
  return (
    <div>
      <h1>Editar Usuário</h1>
      {!loading && <EditUserForm onSubmit={onSubmit} {...user} imagePath={user.image.path} />}
    </div>
  );
};
