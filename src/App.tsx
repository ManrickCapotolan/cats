import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import CatList from './containers/CatList';
import CatPage from './containers/CatPage';

import './styles.css';

const App: React.FC = () => {
  return (
    <Container className="content">
      <Router>
        <Route path="/" exact component={CatList} />
        <Route path="/:id" exact component={CatPage} />
      </Router>
    </Container>
  );
}

export default App;
