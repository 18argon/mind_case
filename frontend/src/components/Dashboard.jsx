import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Users from './users/Users';
import Profile from './Profile';
import AccessLevel from '../utils/access-level';
import { userService, authService } from "../services";

export default function Dashboard() {

  const [ loading, setLoading ] = useState(true);
  const [ user, setUser ] = useState(undefined);
  const [ error, setError ] = useState(undefined);

  const history = useHistory()

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);

      userService.fetchProfile()
        .then(result => {
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
    authService.logOut()
      .then(_ => {
        history.push("/login");
      });
  }

  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading && user.accessLevel === AccessLevel.ADMIN && <Users {...user} />}
      {!loading && user.accessLevel === AccessLevel.COMMON_USER && <Profile {...user} />}
    </>
  );
}
