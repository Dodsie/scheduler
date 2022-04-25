import React, { Fragment } from "react";
import "./styles.scss"
import Header from "./Header";
import Show from "./Show"
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";

export default function Appointment(props) {
  // const interviewers = []

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING"

  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
    )

    function save(name, interviewer) {
      const interview = {
        student: name,
        interviewer
      };
      transition(SAVING) //need time out or delay to show this
      props.bookInterview(props.id, interview)
      transition(SHOW)
    }

  return (
    <article className="appointment">
      <Fragment>
      <Header time={props.time}></Header>
      {mode === EMPTY && (<Empty onAdd={() => transition(CREATE)} />)}
      
      {mode === SAVING && (<Status message={"Saving"} />)}

      {mode === SHOW && (<Show 
      student={props.interview.student} 
      interviewer={props.interview.interviewer}
      onEdit={() => {console.log('edit button')}}
      onDelete={() => {console.log('delete button')}}
      />)}
      
      
      {mode === CREATE && (<Form 
      interviewers={props.interviewers}
      student={props.student}
      onSave={save}
      onCancel={() => back()}
       />)}
      
      </Fragment>
    </article>
  );
};