import React, { Fragment } from "react";
import "./styles.scss"
import Header from "./Header";
import Show from "./Show"
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";
import Error from "./Error";
import Confirm from "./Confirm";

// Returns entire appointment View.

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const CONFIRM = "CONFIRM"
  const DELETE = "DELETE"
  
  // controls modes for transition
  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
    )

    
    function save(name, interviewer) { 
      const interview = {
        student: name,
        interviewer
      };
      transition(SAVING)
      props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true))
    }


    function cancel() {
      transition(DELETE)
      props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true))
    }
    

  return (
    <article className="appointment">
      <Fragment>

      <Header time={props.time}></Header>
      
      {mode === EMPTY && (<Empty 
      onAdd={() => transition(CREATE)} />)}
      
      {mode === DELETE && ( <Status 
      message={"Deleting"}
      />)}

      {mode === SAVING && (<Status
       message={"Saving"} />)}

      {mode === EDIT && (<Form 
      student={props.interview.student}
      interviewer={props.interview.interviewer.id}
      interviewers={props.interviewers}
      onSave={save}
      onCancel={() => back()}
      />)}

      {mode === SHOW && (<Show 
      student={props.interview.student} 
      interviewer={props.interview.interviewer}
      onEdit={() => {transition(EDIT)}}
      onDelete={() => transition(CONFIRM)} //here 
      />)}
      
      {mode === ERROR_SAVE && ( <Error
       message={"Could not cancel appointment"}
       onClose={() => back()}
       /> )}

      {mode === ERROR_DELETE && ( <Error 
      message={"Could not delete appointment"}
      onClose={() => back()}
      /> )}

      {mode === CONFIRM && (<Confirm 
      message={"Are you sure you would like to delete?"}
      onCancel={() => back()} 
      onConfirm={() => cancel()} />)}

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