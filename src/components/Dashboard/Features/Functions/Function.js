const getSessionCookie = (name) => {
    const cookieValue = document.cookie.match(`(^|;)\\s*${name}\\s*=([^;]+)`);
    return cookieValue ? cookieValue.pop() : null;
  };
const searchFun = ()=>{
    window.open("https://iet-davv-student-aggregation-system.netlify.app/", '_blank');
}
export {searchFun,getSessionCookie};