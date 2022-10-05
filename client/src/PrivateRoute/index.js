
import {useSelector, useDispatch} from 'react-redux'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

    const user = useSelector((state) => state.user);
    return user.isLoggedin ? children : <Navigate to="/login" />
}

export default PrivateRoute