import React, { Fragment } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import { Route, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import ActivityForm from "../../features/activities/form/ActivityForm";

function App() {
  const location = useLocation();
  return (
    <>
      {/* Anything above container is alway */}
      <Route exact path="/" component={HomePage} />
      <Route
        // every path that matches / plus any
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              {/* exact otherwise it will try to display route to ActivityDetails */}
              <Route exact path="/activities" component={ActivityDashboard} />
              <Route path="/activities/:id" component={ActivityDetails} />
              <Route
                //force component to reset
                key={location.key}
                path={["/createActivity", "/manage/:id"]}
                component={ActivityForm}
              />
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
