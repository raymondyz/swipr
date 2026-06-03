import { useState, Fragment } from "react"

import styles from "./TimeTable.module.css"
import clsx from "clsx"

function TimeTable({ availability, updateAvailability = null }) {
  const timeList = [
    "6am", "7am", "8am", "9am",
    "10am", "11am", "12pm",
    "1pm", "2pm", "3pm",
    "4pm", "5pm", "6pm",
    "7pm", "8pm", "9pm",
    "10pm", "11pm"
  ];

  const dotw = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [isSelecting, setIsSelecting] = useState(false);
  const [startCell, setStartCell] = useState(null);
  const [dragOriginal, setDragOriginal] = useState(null);
  const [dragToggleValue, setDragToggleValue] = useState(null);

  const cloneAvailability = (avail) => avail.map(row => [...row]);

  const handleMouseDown = (dayIndex, timeIndex, event) => {
    event.preventDefault();

    // Ignore if table is read only
    if (updateAvailability === null) return;

    const original = cloneAvailability(availability);
    const toggleValue = !availability[dayIndex][timeIndex];

    setIsSelecting(true);
    setStartCell({ dayIndex, timeIndex });
    setDragOriginal(original);
    setDragToggleValue(toggleValue);

    updateAvailability(dayIndex, timeIndex, {
      startCell: { dayIndex, timeIndex },
      currentCell: { dayIndex, timeIndex },
      original,
      toggleValue
    });
  };

  const handleMouseEnter = (dayIndex, timeIndex) => {
    // Ignore if table is read only
    if (updateAvailability === null) return;

    if (!isSelecting || !startCell || !dragOriginal) return;

    updateAvailability(dayIndex, timeIndex, {
      startCell,
      currentCell: { dayIndex, timeIndex },
      original: dragOriginal,
      toggleValue: dragToggleValue
    });
  };

  const handleMouseUp = () => {
    // Ignore if table is read only
    if (updateAvailability === null) return;

    if (!isSelecting) return;
    setIsSelecting(false);
    setStartCell(null);
    setDragOriginal(null);
    setDragToggleValue(null);
  };

  return (
    <div
      className={styles.timeGrid}
      onMouseLeave={handleMouseUp}
      onMouseUp={handleMouseUp}
    >
      <div></div>
      {dotw.map(day => (
        <div className={styles.headerCell} key={day}>
          {day}
        </div>
      ))}

      {timeList.map((time, timeIndex) => (
        <Fragment key={time}>
          <div className={styles.timeLabel}>
            {time}
          </div>

          {dotw.map((day, dayIndex) => (
            <div
              key={`${dayIndex}-${timeIndex}`}
              onMouseDown={(event) => handleMouseDown(dayIndex, timeIndex, event)}
              onMouseEnter={() => handleMouseEnter(dayIndex, timeIndex)}
              onMouseUp={handleMouseUp}
              className={clsx(styles.timeCell, availability[dayIndex][timeIndex] && styles.available )}
            />
          ))}
        </Fragment>
      ))}
    </div>
  );
}


export default TimeTable