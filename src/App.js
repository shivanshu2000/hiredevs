import './App.css';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import User from './pages/User';
import Nav from './components/Nav.component.jsx';

function App() {
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/signup" component={Signup} />
        <Route path="/user/:userId" component={User} />
      </Switch>
    </div>
  );
}

export default App;
