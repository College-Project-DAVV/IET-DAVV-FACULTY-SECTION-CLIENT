import React, { useState } from 'react'
import styles from './Dashboard.module.scss'
import TeacherInfo from './TeacherInfo/TeacherInfo'
import Features from './Features/Features'
import Feedback from '../Feedback/Feedback'
const Dashboard = () => {
  const [feedback,setFeedback]=useState(false)
  const [openMenu,setOpenMenu]=useState(false)
  const verify = localStorage.getItem("user");
  if(!verify){
    return;
  }
  return (
    <div className={styles.dashboard}>
     
        {openMenu && <div className={styles.teacherInfo}>
            <TeacherInfo setOpenMenu={setOpenMenu} openMenu={openMenu}/>
        </div>}
    { !feedback?   <div className={styles.features} style={{width:openMenu?"calc(100%)":"100%"}}>
            <Features setFeedback={setFeedback} setMenuOpen={setOpenMenu} openMenu={openMenu}/>
        </div>:
        <div className={styles.feedbackContainer}>
          
        <Feedback setBOOl={setFeedback}/>
        </div>}
        
    </div>
  )
}
export default Dashboard
