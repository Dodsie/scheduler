import React from "react";
import DayListItem from "./DayListItem";


export default function DayList( props ) {
  console.log('props',props);

  return (
    <ul>
      {props.days.map((days) => (
      <DayListItem setDay={props.setDay} key={days.id} name={days.name} spots={days.spots} selected={days.name === props.day} />
      ))}
    </ul>
  )
}