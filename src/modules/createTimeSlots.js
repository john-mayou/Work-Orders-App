import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";
dayjs.extend(isSameOrBefore);
dayjs.extend(duration);
dayjs.extend(utc);

/**
 * This finds the earliest and last times for the work orders passed to it
 * Those times are then changed if they fall within the inside boundaries
 * In this case 6AM and 6PM (moved outwards)
 * @param {array} jobs
 * @returns object with start and end time
 */
const findStartAndEndTimes = (jobs) => {
  const times = jobs.reduce((times, job) => {
    if (job.work_orders.length) {
      job.work_orders.forEach((order) => {
        const order_start_time = dayjs.utc(order.start_time);
        const order_end_time = dayjs
          .utc(order.start_time)
          .add(order.duration, "minutes");

        // setting initial values
        if (Object.keys(times).length === 0) {
          times.start_time = order_start_time;
          times.end_time = order_end_time;
          return;
        }

        if (order_start_time.isBefore(times.start_time)) {
          times.start_time = order_start_time;
        }

        if (order_end_time.isAfter(times.end_time)) {
          times.end_time = order_end_time;
        }
      });
    }
    return times;
  }, {});

  // Setting default inside boudaries (6AM to 6PM)
  if (times.start_time.isAfter(dayjs.utc("2019-10-01T06:00:00"))) {
    times.start_time = dayjs.utc("2019-10-01T06:00:00");
  }
  if (times.end_time.isBefore(dayjs.utc("2019-10-01T18:00:00"))) {
    times.end_time = dayjs.utc("2019-10-01T18:00:00");
  }

  return times;
};

/**
 * Creates array of timestamps in 1 hour increments from array of work technicians with work orders
 * @param {array} jobs
 * @returns array
 */
const createTimeSlots = (jobs) => {
  let { start_time, end_time } = findStartAndEndTimes(jobs);

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

export default createTimeSlots;
