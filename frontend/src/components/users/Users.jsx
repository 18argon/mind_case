import { useState, useEffect } from 'react';
import UsersTable from './UsersTable';
import { userService } from '../../services';
import Header from '../Header';

export default function Users({fullName, image}) {
  const [ loading, setLoading ] = useState(true);
  const [ users, setUsers ] = useState([]);
  const [ error, setError ] = useState(undefined);

  useEffect(() => {
    const fetchUsers = async () => {
      userService.fetchUsers()
        .then(result => {
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
      <Header fullName={fullName} imageSrc={`${process.env.REACT_APP_BACKEND_URL}/${image.path}`}/>
      <div className="container">
        <div className="column">
          <div className="box">
            <h1 className="is-size-3">Usuários</h1>
            {!loading && <UsersTable users={users}/>}
          </div>
        </div>
      </div>
    </>
  );
};
