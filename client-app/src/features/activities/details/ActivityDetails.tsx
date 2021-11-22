import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default function ActivityDetails() {
  const { activityStore } = useStore();
  const { selectedActivity: activity } = activityStore;

  console.log("asdasdas");

  //without this TypeScript will yell at us that activity may be undefined
  // we also have to return some JSX, int this case <LoadingComponent/>
  if (!activity) return <LoadingComponent />;

  return (
    <Card>
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
          <Button
            onClick={() => activityStore.openForm(activity.id)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={activityStore.cancelSelectedActivity}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
