import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { userService } from "../../services";
import SignUpForm from './SignUpForm';

export default function SignUp() {
  const history = useHistory();
  const [ error, setError ] = useState(undefined);

  const onSubmit = (data) => {
    const { email, cpf, fullName, password, avatar } = data;
    userService.createUser(email, cpf, fullName, password, avatar)
      .then((result) => {
        if (result.success) {
          history.push("/");
        } else {
          setError(result.message);
        }
      });
  }

  return (
    <section className="hero is-primary is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop">
              <p className="title black has-text-centered">Mind Case</p>
              <div className="box">
                <SignUpForm onSubmit={onSubmit}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
