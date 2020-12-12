import { Route, Switch, BrowserRouter } from "react-router-dom";
import LogIn from './login/LogIn';
import { PrivateRoute } from './PrivateRoute';
import Home from './Home';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <Route exact path="/login" component={LogIn} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
