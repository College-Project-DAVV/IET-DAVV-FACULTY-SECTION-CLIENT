import React from 'react'
import styles from './dashboard.module.scss'
import TeacherInfo from './TeacherInfo/TeacherInfo'
import Features from './Features/Features'
const Dashboard = () => {
  const verify = localStorage.getItem("user");
  if(!verify){
    return;
  }
  return (
    <div className={styles.dashboard}>
        <div className={styles.teacherInfo}>
            <TeacherInfo/>
        </div>
        <div className={styles.features}>
            <Features/>
        </div>
    </div>
  )
}
export default Dashboard
