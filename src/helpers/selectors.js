const getAppointmentsForDay = (state, day) => {
  let validDay = state.days.filter(x => x.name === day)[0];
  if(!validDay || !state.days) {return []};

  let resultArr = [];
  for (const id of validDay.appointments) {
    const apptObj = state.appointments[id];
    resultArr.push(apptObj)
  }
  return resultArr
}

const getInterview = (state, interview) => {
  let interviewData ={};
  if (!interview) {
    return null;
  }
  interviewData["student"] = interview.student;
  interviewData["interviewer"] = state.interviewers[interview.interviewer];
  return interviewData;
}

const getInterviewersForDay = (state, day) => {
  let validDay = state.days.filter(x => x.name === day)[0];
  if(!validDay || !state.days) {return []};

  let resultArr = [];
  for (const id of validDay.interviewers) {
    const interviewerObj = state.interviewers[id];
    resultArr.push(interviewerObj)
  }
  return resultArr
};


export { getInterview, getAppointmentsForDay, getInterviewersForDay }