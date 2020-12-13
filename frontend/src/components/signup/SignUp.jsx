import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { userService } from "../../services";
import SignUpForm from './SignUpForm';

export default function SignUp() {
  const history = useHistory();
  const [ error, setError ] = useState(undefined);

  const onSubmit = (data) => {
    const { email, cpf, fullName, password, newAvatar } = data;
    console.log(data);
    userService.createUser(email, cpf, fullName, password, newAvatar)
      .then((result) => {
        if (result.success) {
          history.push("/");
        } else {
          setError(result.message);
        }
      });
  }

  return (
    <div>
      <h1>Criar Usuário</h1>
      <SignUpForm onSubmit={onSubmit}/>
      <p>ou</p>
      <Link to='/login'>Log In</Link>
    </div>
  );
};
