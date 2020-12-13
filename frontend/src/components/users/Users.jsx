import { useState, useEffect } from 'react';
import axios from 'axios';
import UsersTable from './UsersTable';

export default function Users() {
  const [ loading, setLoading ] = useState(true);
  const [ users, setUsers ] = useState([]);
  const [ error, setError ] = useState(undefined);

  useEffect(() => {
    const fetchUsers = async () => {
      const requestOptions = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      };
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/users`, requestOptions)
        .then(request => request.data)
        .then(result => {
          console.log(result);
          if (result.success) {
            setUsers(result.data);
          } else {
            setError(result.message);
          }
          setLoading(false);
        });
    };

    fetchUsers()
  }, []);


  return (
    <>
      <h1>Usuários</h1>
      {!loading && <UsersTable users={users}/>}
    </>
  );
};
