import React from "react";
import { Route, Switch } from "react-router-dom";
import UserEntry from "../Entry/UserEntry";
import Sessions from "../Entry/Sessions";
import NotFound from "../Entry/NotFound";
const Routes = () => {
  return (
    <section className="conatiner">
      <Switch>
        <Route exact path="/" component={UserEntry} />
        <Route exact path="/currentSession" component={Sessions} />
        <Route exact path="/endedSession" component={Sessions} />
        <Route exact path="*" component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
