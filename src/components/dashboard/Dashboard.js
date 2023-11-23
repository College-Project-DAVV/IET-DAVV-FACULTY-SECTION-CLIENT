import React from 'react'
import styles from './Dashboard.module.scss'
import TeacherInfo from './TeacherInfo/TeacherInfo'
import Features from './Features/Features'
const Dashboard = () => {
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
