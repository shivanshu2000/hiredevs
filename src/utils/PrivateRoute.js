import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PrivateRoute = (props, { children }) => {
  const { user } = useSelector((state) => state.userDetails);
  console.log(user, 'here');
  if (!user) {
    return <Redirect to="/" />;
  }

  return <Route {...props}>{children}</Route>;
};

export const BackRoute = (props, { children }) => {
  const { user } = useSelector((state) => state.userDetails);
  console.log(user, 'here');
  if (!!user) {
    return <Redirect to="/dashboard" />;
  }

  return <Route {...props}>{children}</Route>;
};
