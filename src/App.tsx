import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CatList from './containers/CatList';
import CatPage from './containers/CatPage';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={CatList} />
        <Route path="/:id" exact component={CatPage} />
      </Router>
    </div>
  );
}

export default App;
