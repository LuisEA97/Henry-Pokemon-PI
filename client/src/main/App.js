import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Root from '../pages/root/root';
import Home from '../pages/home/Home';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Root />
        </Route>
        <Route exact path='/home'>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
