import "./GridColumnList.scss";

// Block Components
import EmptyBlock from "../GridBlocks/EmptyBlock/EmptyBlock";
import NormalBlock from "../GridBlocks/NormalBlock/NormalBlock";
import PartialOverlapBlock from "../GridBlocks/PartialOverlapBlock/PartialOverlapBlock";
import CompleteOverlapBlock from "../GridBlocks/CompleteOverlapBlock/CompleteOverlapBlock";

// dayjs and plugins
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";
dayjs.extend(duration);
dayjs.extend(utc);

function GridColumnList({ work_orders, timeSlots }) {
  const blockColors = ["lightblue", "lightgreen", "lightcoral"];

  // Rendering block helper functions
  const getColor = (index) => blockColors[index % blockColors.length];
  const getBlockMessage = (order) =>
    `${order.location_name}, ${order.location_city} @ ${dayjs
      .utc(order.start_time)
      .format("h:mm A")} for $${order.price}`;

  return (
    <>
      {work_orders.map((order, index) => {
        const twoJobsAgoEndTime =
          index !== 0 &&
          index !== 1 &&
          dayjs
            .utc(work_orders[index - 2].start_time)
            .add(work_orders[index - 2].duration, "minutes");

        const oneJobAgoEndTime =
          index !== 0 &&
          dayjs
            .utc(work_orders[index - 1].start_time)
            .add(work_orders[index - 1].duration, "minutes");

        const currentJobCompletelyOverlaped =
          index !== 0 &&
          oneJobAgoEndTime.isAfter(
            dayjs.utc(order.start_time).add(order.duration, "minutes")
          );

        const lastJobCompleteOverlaped =
          index !== 0 &&
          index !== 1 &&
          twoJobsAgoEndTime.isAfter(oneJobAgoEndTime);

        let timeBetweenOrders;

        if (index === 0) {
          // Find time difference between table start time and first job
          timeBetweenOrders = dayjs
            .utc(order.start_time)
            .diff(timeSlots[0], "minutes");
        } else {
          // Find time difference between end of previous task and start of new task
          timeBetweenOrders = dayjs
            .utc(order.start_time)
            .diff(oneJobAgoEndTime, "minutes");

          // If last job is completely overlapped, calculate based on the end time from two jobs ago
          if (lastJobCompleteOverlaped) {
            const differenceBetweenOverlapedJobEndTimes = dayjs(
              twoJobsAgoEndTime.diff(oneJobAgoEndTime, "minutes")
            );

            timeBetweenOrders -= differenceBetweenOverlapedJobEndTimes;
          }
        }

        // Calculating pixel values
        const pixelCountForHour = 50; // Matched with the CSS file
        const orderDurationPixels = (order.duration / 60) * pixelCountForHour;
        const timeBetweenPixels = (timeBetweenOrders / 60) * pixelCountForHour;
        const emptyPixelsAfterLastJob =
          index === work_orders.length - 1 && // if last job
          (timeSlots
            .at(-1)
            .diff(
              dayjs.utc(order.start_time).add(order.duration, "minutes"),
              "minutes"
            ) /
            60) *
            pixelCountForHour;

        return (
          <div
            key={order.id}
            className={`work-orders-column`}
            style={{ position: "relative" }}
          >
            {timeBetweenOrders > 0 && <EmptyBlock height={timeBetweenPixels} />}
            {timeBetweenOrders >= 0 ? (
              <NormalBlock
                height={orderDurationPixels}
                color={getColor(index)}
                message={getBlockMessage(order)}
              />
            ) : currentJobCompletelyOverlaped ? (
              <CompleteOverlapBlock
                height={orderDurationPixels}
                topAbsolutePosition={timeBetweenPixels} // is negative
                color={getColor(index)}
                message={getBlockMessage(order)}
              />
            ) : (
              <PartialOverlapBlock
                overlapHeight={orderDurationPixels}
                topAbsolutePosition={timeBetweenPixels} // is negative
                nonOverlapHeight={
                  orderDurationPixels - -timeBetweenPixels // time between is negative
                }
                color={getColor(index)}
                message={getBlockMessage(order)}
              />
            )}
            {emptyPixelsAfterLastJob !== 0 && (
              <EmptyBlock height={emptyPixelsAfterLastJob} />
            )}
          </div>
        );
      })}
    </>
  );
}

export default GridColumnList;
