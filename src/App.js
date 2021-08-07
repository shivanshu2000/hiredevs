import './App.css';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import User from './pages/User';
import Dashboard from './pages/Dashboard';

import Nav from './components/Nav.component.jsx';

function App() {
  const { initialized } = useSelector((state) => state.async);

  if (!initialized) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/signup" component={Signup} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/user/:userId" component={User} />
      </Switch>
    </div>
  );
}

export default App;
