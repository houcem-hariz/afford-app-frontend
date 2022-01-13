import { Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { login } from "./redux/actions/userActionCreators";
import Layout from './components/Layout';
import Home from './components/Home'
import Users from './components/Users';
import Products from './pages/Products';
import Categories from './pages/Categories';
import Stores from './pages/Stores';
import Login from './pages/Login';
import Register from './pages/Register';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import ViewStore from './components/Stores/ViewStore';
import UpdateStore from './components/Stores/UpdateStore';

import './index.css';

function App() {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('user'))
  const token = localStorage.getItem('token')
  if (user && token) {
    dispatch(login(user, token))
  }
  return (
    <Layout>
      <Switch>
        <PrivateRoute exact path="/home" component={Home} />
        <PrivateRoute exact path="/" component={Home} />
        <PublicRoute exact path="/login" component={Login} />
        <PublicRoute exact path="/register" component={Register} />
        <PrivateRoute exact path="/stores" component={Stores} />
        <PrivateRoute exact path="/stores/:id" component={ViewStore} />
        <PrivateRoute exact path="/stores/update/:id" component={UpdateStore} />
        <PrivateRoute exact path="/categories" component={Categories} />
        <PrivateRoute exact path="/products" component={Products} />
        <PrivateRoute exact path="/users" component={Users} />
      </Switch>
    </Layout>
  );
}

export default App;
