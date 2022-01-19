import { Route, Switch } from 'react-router-dom';
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
import ViewCategory from './components/Categories/ViewCategory';
import UpdateCategory from './components/Categories/UpdateCategory';
import NotFound from './pages/NotFound';
import ViewProduct from './components/Products/ViewProduct';
import UpdateProduct from './components/Products/UpdateProduct';
import Profile from './pages/Profile';

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
        <PrivateRoute exact path="/categories/:id" component={ViewCategory} />
        <PrivateRoute exact path="/categories/update/:id" component={UpdateCategory} />
        <PrivateRoute exact path="/products" component={Products} />
        <PrivateRoute exact path="/products/:id" component={ViewProduct} />
        <PrivateRoute exact path="/products/update/:id" component={UpdateProduct} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/users" component={Users} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default App;
