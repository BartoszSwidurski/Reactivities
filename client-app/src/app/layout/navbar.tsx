import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  const { activityStore } = useStore();
  const { setSelectedActivity } = activityStore;

  return (
    <Menu inverted fixed="top">
      <Container>
        {/* Without exact, two tabs will be selected at the time Reactivities and Activities because '/' is contained in both */}
        <Menu.Item as={NavLink} exact to="/" header>
          {/* react knows that we look in public folder src */}
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item as={NavLink} to="/activities" name="Activities" />
        <Menu.Item>
          <Button
            as={NavLink}
            to="/createActivity"
            positive
            content="Create Activity"
            onClick={() => setSelectedActivity(undefined)}
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
