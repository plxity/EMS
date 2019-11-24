import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Routes from "./components/routing/Routes";
import { Provider } from "react-redux";
import Store from './Store';
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import "./App.css";

const App = () => {
  return (
    <Provider store={Store}>
      <Router>
        <Fragment>
          <Switch>
            <Route component={Routes} />
          </Switch>
          <NotificationContainer/>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
