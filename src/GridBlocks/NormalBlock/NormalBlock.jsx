function NormalBlock({ height, color, message }) {
  return (
    <span
      style={{
        height: `${height}px`,
        backgroundColor: color,
      }}
    >
      {message}
    </span>
  );
}

export default NormalBlock;
