function CompleteOverlapBlock({ height, topAbsolutePosition, color, message }) {
  return (
    <span
      className="overlaping-block"
      style={{
        height: `${height}px`,
        top: `${topAbsolutePosition}px`,
        backgroundColor: color,
        opacity: "0.5",
      }}
    >
      {message}
    </span>
  );
}

export default CompleteOverlapBlock;
