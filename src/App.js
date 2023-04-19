import "./App.scss";
import axios from "axios";
import { useEffect, useState } from "react";

// Components
import GridColumnList from "./GridColumnList/GridColumnList";

// Dayjs
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import utc from "dayjs/plugin/utc";
dayjs.extend(isSameOrBefore);
dayjs.extend(utc);

function App() {
  const [jobs, setJobs] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const jobsResult = await axios.get("/jobs");
    setJobs(jobsResult.data);
    setTimeSlots(
      createTimeSlots({
        start_time: dayjs.utc("2010-01-19T06:00:00"),
        end_time: dayjs.utc("2010-01-19T18:00:00"),
      })
    );
  };

  /**
   * Creates array of timestamps in 1 hour increments from start and end times
   * @param {array} jobs
   * @returns array
   */
  const createTimeSlots = ({ start_time, end_time }) => {
    if (end_time.isBefore(start_time)) {
      end_time = end_time.add(1, "day");
    }

    let slotsArray = [];
    while (start_time.isSameOrBefore(end_time)) {
      slotsArray.push(start_time);
      start_time = start_time.add(1, "hour");
    }
    return slotsArray;
  };

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
