import React from 'react';
import FileScreen from './screens/FileScreen';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet'

const TITLE = 'Upload and Display file'

function App() {
  return (
    <Router>
      <Helmet>
        <title>{ TITLE }</title>
      </Helmet>
        <Route exact path="/">
          <FileScreen />
        </Route> 
    </Router>
  );
}

export default App;
