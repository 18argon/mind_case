import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function Home() {

  const history = useHistory()

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
      });
  }
  return (
    <div>
      <h1>Usuário logado</h1>
      <button onClick={handleLogout} >Sair</button>
    </div>
  );
}