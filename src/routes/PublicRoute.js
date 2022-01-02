import {Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';

function PublicRoute({component: Component, ...rest}) {
    const {isAuth} = useSelector(state => state.user);
    console.log({isAuth});
    return (
        <Route 
        {...rest}
        render={(props) => (
            !isAuth 
            ? <Component />
            : <Redirect to={{pathname: '/stores', state: {from: props.location}}} />
        )}
        />
    )
}

export default PublicRoute;