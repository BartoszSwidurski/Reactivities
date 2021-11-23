import React, { useEffect } from "react";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { useParams, Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

export default observer(function ActivityDetails() {
  const { activityStore } = useStore();
  const {
    selectedActivity: activity,
    loadActivity,
    loadingInitial,
  } = activityStore;

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    console.log("id ", id);
    if (id) loadActivity(id);
  }, [id, loadActivity]);

  if (loadingInitial || !activity) return <LoadingComponent />;

  //without this TypeScript will yell at us that activity may be undefined
  // we also have to return some JSX, int this case <LoadingComponent/>
  if (!activity) return <LoadingComponent />;

  return (
    <Card>
      {console.log("rerender")}
      <Image src={`assets/categoryImages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span className="date">{activity.title}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          {/* <Button basic color="blue" content="Edit" /> */}
          <Button
            as={Link}
            to={`/manage/${activity.id}`}
            positive
            content="Edit"
          />
          <Button
            as={Link}
            to="/activities"
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
});
