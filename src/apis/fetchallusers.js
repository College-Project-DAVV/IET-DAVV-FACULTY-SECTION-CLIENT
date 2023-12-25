import { getSessionCookie } from "../components/Dashboard/Features/Functions/Function";
export const fetchDataFromAPI=()=> {
    const SERVER_BASE_URL = process.env.REACT_APP_FETCH_USER;
      const apiUrl = `${SERVER_BASE_URL}/fetchuser`;
      const data =  localStorage.getItem("UserToken");
      console.log(data);
      return  fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Set the Content-Type header for JSON data
          },
          body: JSON.stringify({"token":data}), // Convert the data to a JSON string
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json(); // Parse the response as JSON
          })
         
          .catch((error) => {
            // Handle errors, if any
            console.error('Error in POST request:', error);
          });
  }