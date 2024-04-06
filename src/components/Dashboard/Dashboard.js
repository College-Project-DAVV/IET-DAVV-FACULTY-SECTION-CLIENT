import React, { useState } from 'react'
import styles from './Dashboard.module.scss'
import TeacherInfo from './TeacherInfo/TeacherInfo'
import Features from './Features/Features'
import Feedback from '../Feedback/Feedback'
const Dashboard = () => {
  const [feedback,setFeedback]=useState(true)
  const verify = localStorage.getItem("user");
  if(!verify){
    return;
  }
  return (
    <div className={styles.dashboard}>
        <div className={styles.teacherInfo}>
            <TeacherInfo/>
        </div>
    { !feedback?   <div className={styles.features}>
            <Features setFeedback={setFeedback}/>
        </div>:
        <div className={styles.feedbackContainer}>
          
        <Feedback setBOOl={setFeedback}/>
        </div>}
        
    </div>
  )
}
export default Dashboard
