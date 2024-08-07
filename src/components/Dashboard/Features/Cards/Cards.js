import React from "react";
import styles from "./cards.module.scss";
import search from "../../../../assets/search.svg";
import attendance from "../../../../assets/attendance2.svg";
import marks from "../../../../assets/marks.svg";
import dqac from "../../../../assets/dqac.svg";
import downloads from "../../../../assets/downloads.svg";
import feedback from "../../../../assets/feedback.svg";
import {useNavigate} from "react-router-dom";
import {
  getSessionCookie
} from "../Functions/Function";
const Cards = ({setFeedback}) => {

  const navigate = useNavigate();
    const username = getSessionCookie("username");
    const password = getSessionCookie("pass");
    const currentUrl = window.location.href;
    const urlParts = currentUrl.split('/');
const baseUrl = `${urlParts[0]}//${urlParts[2]}`;
  const features = [
    {
      title: "Feedback",
      desc: "This shows feedback about a teacher by students and parents.",
      icon: feedback,
      url:"/feedback",
      flag:"flag"
    },
    {
      title: "Search Students",
      desc: "This allows you to search students using their name, roll number, email, branch, year and other details",
      icon: search,
      url: `${baseUrl}`,
      request:"GET"
    },
    {
      title: "Attendance",
      desc: "This allows teachers to maintain attendance of students on regular basis.",
      icon: attendance,
      url:"https://attendance.ietdavv.edu.in/",
      request:"POST",
      username:username,
      password:password,
      flag:"flag"
    },
    {
      title: "Marks",
      desc: "This allows teachers to maintain marks of students in every test efficiently.",
      icon: marks,
      url:"https://exam.ietdavv.edu.in/verifyfaculty",
      request:"POST",
      username:"t1",
      password:"t2",
      flag:"flag"
    },
    {
      title: "DQAC",
      desc: "Departmental Quality Assurance Cell",
      icon: dqac,
      url:"",
      request:"POST",
      username:username,
      password:password,
      flag:"flag"
    },
    {
      title: "Downloads",
      desc: "This allows teachers to download forms and templates ",
      icon: downloads,
      url:"https://forms.ietdavv.edu.in/",
      request:"POST",
      username:username,
      password:password,
      flag:"flag"
    },

  ];
  const submitForm=(id)=>{
    var form = document.getElementById(id);
    form.submit();
  }
  const searchStudents = async(id)=>{
    if( getSessionCookie("UserToken") && localStorage.getItem("UserToken")){
      navigate("/search")
    }
    else{
      navigate("/googleauth");
    }
  }
  const handleCardClick=(key,title)=>{
    if(title==="Search Students")
    {searchStudents(key)}
    else if (title==="Feedback"){
      setFeedback(true)
      
    }
     else{submitForm(key)}
  }
  return (
    <div className={styles.cards}>
      {features.map((feature, key) => (
        <>
        <form id={key} action={feature.url} method={feature.request} style={{display:"none"}}>
        <input type="hidden" name={feature.username} id={feature.username} value={username?username:"null"} />
        <input type="hidden" name={feature.password} id={feature.password} value={password?password:"null"} />
        <input type="hidden" name={feature.flag} id={feature.flag} value='faculty'/>
      </form>
        <div className={styles.card} key={key} onClick={()=>{handleCardClick(key,feature.title)}}>
          <div className={styles.iconbg}>
            <img src={feature.icon} alt="icon" className={styles.icon} />
          </div>
          <div className={styles.title}>{feature.title}</div>
          <p>{feature.desc}</p>
        </div>
            </>
      ))}
    </div>
  );
};

export default Cards;
