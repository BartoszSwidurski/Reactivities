import React from "react";
import { Button, Container, Header, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />

          <span
            style={{ color: "white", fontSize: "50px", marginTop: "10000px" }}
          >
            Reactivities
          </span>
        </Header>
        <Header as="h2" inverted content="Welcome to Reactivities"></Header>
        <Button as={Link} to="/activities" size="huge" inverted>
          Take me to the Activities
        </Button>
      </Container>
    </Segment>
  );
}
