import { useState, useEffect} from 'react';
import axios from 'axios';

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = day => setState({...state, day});
 
  useEffect(() => {
  Promise.all([
    axios.get("/api/days"),
    axios.get("/api/appointments"),
    axios.get("/api/interviewers")
  ]).then((all) => {
    setState(prev => ({...prev, 
      days: all[0].data, 
      appointments: all[1].data, 
      interviewers: all[2].data
    }));
  })
  .catch((error) => {
    console.log(error.response.status)
  });
  }, [])

  const updateSpots = () => {
    axios.get("/api/days").then((response) => {
      setState(prev => ({...prev, days: response.data}))
    }  
    )
  }

  const bookInterview = (id, interview)=> {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, {interview})
    .then((response) => {
      console.log(response)
      setState({...state, appointments})
      updateSpots()
    })     
  }

  const cancelInterview = (id) => {
    
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`)
    .then(() => { setState({...state, appointments})
    console.log(state)
    updateSpots()
  }
  
    )
  };

  

  return {state, setDay, bookInterview, cancelInterview}
}








// const updateSpotsTwo = (weekday) => {
  //   console.log('state',state)
  //   let dayIndex = 0;
  //   const theDay = state.days.find((day, index) => {
  //     const isCorrectDay = day.name === weekday;
      
  //     if (isCorrectDay) {
  //       dayIndex = index
  //     }
  //     return isCorrectDay;
  //   //all weekdays
  //   }) 
  //   let newSpots = 0

  //   theDay.appointments.forEach((id) => {
  //     if (state.appointments[id].interview) {
  //       newSpots += 1
  //     }
  //   })
  //   console.log(newSpots)
  //   const updatedDay = {
  //     ...theDay,
  //     spots: newSpots
  //   }
  //   const days = [...state.days]
  //   days[dayIndex] = updatedDay
  //   console.log('days',days)
  //   setState(prev => ({...prev, days: days}))
  // }