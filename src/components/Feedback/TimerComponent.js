import React, { useEffect } from "react";
import{ useState } from "react";
import { calculateTimeDifference } from "../../actions/exportingFunctions";

function TimerComponent({ item }) {
    // State to store the time difference
    const [timeDifference, setTimeDifference] = useState(null);
  
    // Effect to update the time difference every second
    useEffect(() => {
      const intervalId = setInterval(() => {
        // Calculate the time difference
        const difference = calculateTimeDifference(item.startTime);
        setTimeDifference(difference);
      }, 1000);
  
      // Cleanup function to clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    }, [item.startTime]); // Only re-run the effect when the startTime prop changes
  
    // Render the component
    return (
      <>
        
        {timeDifference ? (
  <>
    {timeDifference.days > 0 ? `${timeDifference.days} days, ` : ''}
    {timeDifference.hours} hours, {timeDifference.minutes} minutes, {timeDifference.seconds} seconds
  </>
) : 'Calculating...'}

      </>
    );
  }
  export default TimerComponent;
