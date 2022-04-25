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
 let validDay = state.days.find(x => x.name === day);
 let resultArr = [];
  
 if(!validDay) {
    return [] };

    validDay.appointments.forEach(id => 
      {
        if (state.appointments[id].interview) {
          const interviewerId = state.appointments[id].interview.interviewer
          resultArr.push(state.interviewers[interviewerId])
        }
        
      }
    
      )
      return [...new Map(resultArr.map(item => [item["id"], item])).values()];
};


export { getInterview, getAppointmentsForDay, getInterviewersForDay }