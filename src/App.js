import "./App.scss";
import axios from "axios";
import { useEffect, useState } from "react";

// Modules
import createTimeSlots from "./modules/createTimeSlots";
import jobsData from "./jobs";

// Components
import GridColumnList from "./GridColumnList/GridColumnList";

function App() {
  const [jobs, setJobs] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    // fetchJobs();
    setJobs(jobsData);
    setTimeSlots(createTimeSlots(jobsData));
  }, []);

  // const fetchJobs = async () => {
  //   const jobsResult = await axios.get("/api/jobs");
  //   setJobs(jobsResult.data);
  //   setTimeSlots(createTimeSlots(jobsResult.data));
  // };

  return (
    <section className="work-order-grid">
      <div className="timeslots">
        <div className="technician-name-box">{/* Space Fill */}</div>
        {timeSlots.map((time, i) => (
          <div className="timeslots__time-box" key={i}>
            <span className="timeslots__time-text">{time.format("h:mm")}</span>
          </div>
        ))}
      </div>
      {jobs.map(({ technician_name, work_orders }, i) => (
        <div key={i}>
          <div className="technician-name-box">
            <p>{technician_name}</p>
          </div>
          <GridColumnList work_orders={work_orders} timeSlots={timeSlots} />
        </div>
      ))}
    </section>
  );
}

export default App;
