function PartialOverlapBlock({
  overlapHeight,
  topAbsolutePosition,
  nonOverlapHeight,
  color,
  message,
}) {
  return (
    <>
      {/* Overlapping part */}
      <span
        className="overlaping-block"
        style={{
          height: `${overlapHeight}px`,
          top: `${topAbsolutePosition}px`,
          backgroundColor: color,
          opacity: "0.5",
        }}
      >
        {message}
      </span>
      {/* Not overlapping part */}
      <span
        style={{
          height: `${nonOverlapHeight}px`,
          backgroundColor: color,
        }}
      ></span>
    </>
  );
}

export default PartialOverlapBlock;
