import { useHistory } from 'react-router-dom';
import LogInForm from './LogInForm';
import { authService } from "../../services";


export default function LogIn() {
  const history = useHistory();

  const onSubmit = data => {
    authService.logIn(data.username, data.password)
      .then(_ => history.push('/'))
  };

  return (
    <>
      <h1>Log In</h1>
      <LogInForm onSubmit={onSubmit}/>
    </>
  );
}
