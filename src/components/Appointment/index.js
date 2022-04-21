import React from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show"
import Empty from "./Empty";

export default function Appointment(props) {
  console.log(props.interview)
  // const formatRender = () => {
  //   if (props.interview === null) {
  //     return < Show />
  //   }
  //   else {<Empty />}
  // };
  return (
    <article className="appointment">
    </article>
  );
};