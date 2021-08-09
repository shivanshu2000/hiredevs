import './App.css';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from './pages/Home';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';

import Nav from './components/Nav.component.jsx';
import Loader from './components/Loader.component';
import NotFoundPage from './pages/NotFoundPage';
import ErrorBoundary from './components/ErrorBoundary.component';

function App() {
  const { initialized } = useSelector((state) => state.async);

  if (!initialized) {
    return <Loader />;
  }
  return (
    <ErrorBoundary>
      <div className="App">
        <ToastContainer position="top-right" hideProgressBar />
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/signup" component={Signup} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/explore" component={Explore} />
          <Route path="/user/:username" component={Profile} />
          <Route path="*" exact={true} component={NotFoundPage} />
        </Switch>
      </div>
    </ErrorBoundary>
  );
}

export default App;
