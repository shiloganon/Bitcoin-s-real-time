import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { AppHeader } from './cmps/AppHeader';
import { CurrencyList } from './cmps/CurrencyList';
import { Overview } from './cmps/Overview';

export const App = () => {
  return (
    <Router>
      <AppHeader />
      <main className="layout">
        <Switch>
          <Route path="/Overview" component={Overview} />
          <Route path="/" component={CurrencyList} />
        </Switch>
      </main>
    </Router>
  );
}

