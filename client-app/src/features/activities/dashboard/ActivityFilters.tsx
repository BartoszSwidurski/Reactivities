import React from "react";
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";
import "react-calendar/dist/Calendar.css";

export default function ActivityFilters() {
  return (
    <>
      <Menu vertical size="large" style={{ width: "100%", marginTop: 15 }}>
        <Header icon="filter" attached color="teal" content="Filters" />
        <Menu.Item content="All Activities" />
        <Menu.Item content="I'm going" />
        <Menu.Item content="I'm hosting" />
      </Menu>
      <Header />
      {/*  npm install react-calendar, npm install @types/react-calendar */}
      {/* import "react-calendar/dist/Calendar.css" */}
      <Calendar />
    </>
  );
}
