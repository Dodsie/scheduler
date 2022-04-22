import React, { Fragment } from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show"
import Empty from "./Empty";

export default function Appointment(props) {
  return (
    <article className="appointment">
      <Fragment>
      <Header time={props.time}></Header>
      {!props.interview ? (<Empty id={props.id}></Empty>) : (<Show student={props.student} interviewer={props.interview} ></Show>)}
      </Fragment>
    </article>
  );
};