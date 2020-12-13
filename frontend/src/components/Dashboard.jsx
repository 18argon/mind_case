import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Users from './users/Users';
import Profile from './Profile';
import AccessLevel from '../utils/access-level';

export default function Dashboard() {

  const [ loading, setLoading ] = useState(true);
  const [ user, setUser ] = useState(undefined);
  const [ error, setError ] = useState(undefined);

  const history = useHistory()

  useEffect(() => {
    const fetchUser = async () => {
      const requestOptions = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }

      setLoading(true);
      console.log(requestOptions);

      axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/profile`, requestOptions)
        .then(response => response.data)
        .then(result => {
          console.log(result);
          if (result.success) {
            setUser(result.data);
            setLoading(false);
          } else {
            setError(result.message);
          }
        })
        .catch((_) => {
          history.push('/login')
        })
    };

    fetchUser();
  }, [ history ]);

  const handleLogout = () => {
    const requestOptions = {
      withCredentials: true,
    };

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/auth/revoke`, {}, requestOptions)
      .then((response) => response.data)
      .then((result) => {
        if (result.success) {
          localStorage.setItem("accessToken", null);
          history.push("/login");
        }
      })
      .catch(err => console.log(err));
  }
  return (
    <>
      <button onClick={handleLogout}>Sair</button>
      {loading && <p>Loading...</p>}
      {!loading && user.accessLevel === AccessLevel.ADMIN && <Users/>}
      {!loading && user.accessLevel === AccessLevel.COMMON_USER && <Profile user={user}/>}
    </>
  );
}
