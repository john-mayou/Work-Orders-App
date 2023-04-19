import Swal from "sweetalert2";

function EmptyBlock({ height }) {
  const showTimeBetweenPopup = () => {
    let minutes = Math.round((height / 50) * 60);
    let hours = 0;

    while (minutes >= 60) {
      hours++;
      minutes -= 60;
    }

    hours
      ? minutes
        ? Swal.fire(
            `There is ${hours} hours and ${minutes} minutes between work orders`
          )
        : Swal.fire(`There is ${hours} hours between work orders`)
      : Swal.fire(`There is ${minutes} minutes between work orders`);
  };

  return (
    <span
      style={{
        height: `${height}px`,
        backgroundColor: "#f0f0f0",
      }}
      onClick={showTimeBetweenPopup}
    ></span>
  );
}

export default EmptyBlock;
