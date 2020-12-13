import { useState, useEffect } from 'react';
import UsersTable from './UsersTable';
import { userService } from '../../services';

export default function Users() {
  const [ loading, setLoading ] = useState(true);
  const [ users, setUsers ] = useState([]);
  const [ error, setError ] = useState(undefined);

  useEffect(() => {
    const fetchUsers = async () => {
      userService.fetchUsers()
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
