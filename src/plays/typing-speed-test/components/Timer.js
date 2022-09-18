import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const Timer = () => {
  return (
    <CountdownCircleTimer
      isPlaying
      duration={60}
      size={120}
      colors={["#4BB543 ", "#F7B801", "#A30000", "#FF0000"]}
      colorsTime={[60, 40, 20, 0]}
      strokeWidth={8}
    >
      {({ remainingTime }) => (
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl font-semibold">{remainingTime}</p>
          <p className="text-sm">Seconds</p>
        </div>
      )}
    </CountdownCircleTimer>
  );
};

export default Timer;
