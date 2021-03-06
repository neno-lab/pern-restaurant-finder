import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './routes/Home';
import RestaurantDetailPage from './routes/RestaurantDetailPage';
import UpdatePage from './routes/UpdatePage';

function App() {
  return (
    <div className='container'>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route
            exact
            path='/restaurants/:id'
            component={RestaurantDetailPage}
          />
          <Route exact path='/restaurants/:id/update' component={UpdatePage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
