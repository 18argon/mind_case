import { Route, Switch, BrowserRouter } from "react-router-dom";
import LogIn from './login/LogIn';
import { PrivateRoute } from './PrivateRoute';
import Dashboard from './Dashboard';
import EditUser from './edit-user/EditUser';
import EditUserProfile from './edit-user/EditUserProfile';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path="/" component={Dashboard}/>
        <Route exact path="/login" component={LogIn}/>
        <PrivateRoute exact path="/users/profile/edit" component={EditUserProfile}/>
        <PrivateRoute exact path="/users/:id/edit" component={EditUser}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
