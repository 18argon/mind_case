import { useHistory } from 'react-router-dom';
import LogInForm from './LogInForm';
import axios from 'axios';


export default function LogIn() {
  const history = useHistory();

  const onSubmit = data => {
    axios
      .post('http://localhost:3000/auth/login',
        {
          username: data.username,
          password: data.password,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((response) => response.data)
      .then((data) => {
        if (data.success) {
          localStorage.setItem('accessToken', data.accessToken);
          history.push('/');
        }
      })
      .catch((err) => console.log({ err }));
  };

  return (
    <LogInForm onSubmit={onSubmit}/>
  );
}