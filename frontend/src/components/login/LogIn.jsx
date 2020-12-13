import { Link, useHistory } from 'react-router-dom';
import LogInForm from './LogInForm';
import { authService } from "../../services";

export default function LogIn() {
  const history = useHistory();

  const onSubmit = data => {
    authService.logIn(data.username, data.password)
      .then(_ => history.push('/'))
  };

  return (
    <section className="hero is-primary is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop">
              <p className="title black has-text-centered">Mind Case</p>
              <div className="box">
                <LogInForm onSubmit={onSubmit}/>
                <div className="text-center">

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
