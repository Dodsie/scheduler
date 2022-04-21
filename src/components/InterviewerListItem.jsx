import React, {useState} from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  // const [id, setId] = useState("")
  // const setInterviewer = (id) => {
  //   (id)
  // }
  const showName = () => {
    if (props.selected) {
      return props.name
    }
  }
  console.log(props)
  const InterviewerClass = classNames('interviewers__item',{
    'interviewers__item--selected' : props.selected,
  })
  return (
    <li onClick={() => {props.setInterviewer(props.id)}} className={InterviewerClass}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
  {showName()}
</li>
  );
}