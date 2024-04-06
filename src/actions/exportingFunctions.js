 export function formatDate(inputString) {
    // Create a new Date object from the input string
    const date = new Date(inputString);
  
    // Get day, month, and year from the date object
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
  
    const formattedDate = `${day}-${month}-${year}`;
  
    return formattedDate;
  }
 export  function isPastDate(endDateISOString) {
    const endDate = new Date(endDateISOString);
    const today = new Date();
    return endDate >= today;
  }
  
 export function formatDateToAMPM(startDateISOString, endDateISOString) {
    const startDate = new Date(startDateISOString);
    const endDate = new Date(endDateISOString);
  
    const options = {
      year: "numeric",
      month: "long",
      day: "2-digit",
    };
    const options2 = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
  
    const formattedStartDate = startDate.toLocaleDateString("en-US", options);
    const formattedStartTime = startDate.toLocaleTimeString("en-US", options2);
  
    const formattedEndTime = endDate.toLocaleTimeString("en-US", options2);
  
    return `${formattedStartDate} at ${formattedStartTime} to  ${formattedEndTime}`;
  }
  
  
  export function formatDateinput(inputString) {
    const date = new Date(inputString);
    const year = date.getFullYear();
    // Month and day need to be formatted to have leading zeros if necessary
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  
 export function setTimeInInputField(timeString) {
    const time = new Date(timeString);
    
    const hours = String(time.getHours()).padStart(2, '0');
    const minutes = String(time.getMinutes()).padStart(2, '0');
    
    // Construct the time string in HH:mm format
    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
  }

   export function calculateTimeDifference(startTime) {
    // Convert the start time to a Date object
    const startDate = new Date(startTime);

    // Get the current time
    const currentDate = new Date();

    // Calculate the time difference in milliseconds
    const timeDifference =  startDate.getTime()-currentDate.getTime() ;

    // Convert the time difference from milliseconds to seconds
    const secondsDifference = Math.floor(timeDifference / 1000);

    // Calculate days, hours, minutes, and remaining seconds
    const days = Math.floor(secondsDifference / (24 * 3600));
    const hours = Math.floor((secondsDifference % (24 * 3600)) / 3600);
    const minutes = Math.floor((secondsDifference % 3600) / 60);
    const seconds = secondsDifference % 60;

    // Return an object with the calculated time components
    return {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    };
}