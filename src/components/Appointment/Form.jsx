import React, { useState } from 'react';
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";


export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("")
  const reset = () => {
    setStudent("");
    setInterviewer("");
  };
  const cancel = () => {
    reset()
    props.onCancel();
  };
  
  const validate = () => {
    if (student=== "") {
      setError("student name cannot be blank");
      return
    }
    if (!interviewer) {
      setError("please select an interviewer")
      return;
    }
    setError("")
    props.onSave(student, interviewer)
    }
  

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" >
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={event => setStudent(event.target.value)}
            value={student}
            onSubmit={event => event.preventDefault()}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          onChange={event => setInterviewer(event)}
          interviewers={props.interviewers}
          value={interviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  );
};