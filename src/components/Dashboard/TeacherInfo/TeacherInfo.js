import React from 'react'
import styles from './teacherInfo.module.scss'
import profile from '../../../assets/profile.svg'
import email from '../../../assets/email2.svg'
import phone from '../../../assets/phone.svg'
import logout from '../../../assets/logout.svg'
import { Logout } from './Logout'
const TeacherInfo = () => {
    const info = [
        {
            name : "Dr. Vaibhav Jain",
            email : "vjain@ietdavv.edu.in",
            phone : "91 94250 71648",
            profile : profile
        }
    ]
  return (
    <div className={styles.teacher}>
      {info.map((item, key) => (
        <div className={styles.info} key={key}>
            <img src={item.profile} alt='profile' className={styles.profile}/>
            <span className={styles.name}>{item.name}</span>
            <div className={styles.field}>
                <img src={email} alt='email'/>
                <span className={styles.head}>Email : </span>
                <span className={styles.value}>{item.email}</span>
            </div>
            <div className={styles.field}>
                <img src={phone} alt='phone'/>
                <span className={styles.head}>Phone no : </span>
                <span className={styles.value}>{item.phone}</span>
            </div>
        </div>
      ))}
      <div className={styles.logout} onClick={Logout}>
        <img src={logout} alt="logout" />
        <p>Logout</p>
      </div>
    </div>
  )
}

export default TeacherInfo
