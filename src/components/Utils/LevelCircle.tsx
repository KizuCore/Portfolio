import React from "react";

type LevelCircleProps = {
  color: string;
};

const LevelCircle: React.FC<LevelCircleProps> = ({ color }) => {
  return (
    <div
      className="level-circle"
      style={{ backgroundColor: color }}
    ></div>
  );
};

export default LevelCircle;
