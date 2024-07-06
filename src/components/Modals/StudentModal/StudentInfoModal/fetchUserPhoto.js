export const fetchDataFromAPI=(memberid)=> {
    const SERVER_BASE_URL = process.env.REACT_APP_FETCH_USER;
      const apiUrl = `${SERVER_BASE_URL}/userphoto`;
      const data = localStorage.getItem('UserToken');
      return  fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Set the Content-Type header for JSON data
          },
          body: JSON.stringify({"token":data,"memberid":memberid}), // Convert the data to a JSON string
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