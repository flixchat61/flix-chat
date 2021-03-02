import React from 'react';
import 'styles/index.scss';

import { Provider } from 'react-redux';
import { store } from 'src/redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import links from 'data/links.js';
import { Home, Chat } from 'pages';
import { ScrollToTop } from 'components';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <Switch>
          <Route path={links.home} exact component={Home} />
          <Route path={links.chat} exact component={Chat} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
