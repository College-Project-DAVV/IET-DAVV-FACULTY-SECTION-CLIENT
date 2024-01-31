export const changepassword=(userid,password)=> {
    const SERVER_BASE_URL = process.env.REACT_APP_LDAP_URL;
      const apiUrl = `${SERVER_BASE_URL}/forgotPassword`;
      return  fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Set the Content-Type header for JSON data
          },
          body: JSON.stringify({"UserId":userid,"password":password}), // Convert the data to a JSON string
        })
          .then((response) => {
            if(!response.ok){
              return 401;
            }
            return response.json();
          })
         
          .catch((error) => {
            console.error('Error in POST request:', error);
          });
  }