import React from "react";
import DayListItem from "./DayListItem";


export default function DayList( props ) {

  return (
    <ul>
      {props.days.map((days) => (
      <DayListItem 
      key={days.id} 
      name={days.name} 
      spots={days.spots} 
      selected={days.name === props.value}
      setDay={props.onChange}
      />
      ))}
      
    </ul>
  )
}