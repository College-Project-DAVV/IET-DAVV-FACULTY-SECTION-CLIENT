import React from 'react'
import styles from './cards.module.scss'
import search from '../../../../assets/search.svg'
import attendance from '../../../../assets/attendance2.svg'
import marks from '../../../../assets/marks.svg'
import dqac from '../../../../assets/dqac.svg'
import downloads from '../../../../assets/downloads.svg'
import feedback from '../../../../assets/feedback.svg'
const Cards = () => {
    const features = [
        {
            title : "Search Students",
            desc : "This allows you to search students using their name, roll number, email, branch, year and other details",
            icon : search
        },
        {
            title : "Attendance",
            desc : "This allows teachers to maintain attendance of students on regular basis.",
            icon : attendance
        },
        {
            title : "Marks",
            desc : "This allows teachers to maintain marks of students in every test efficiently.",
            icon : marks
        },
        {
            title : "DQAC",
            desc : "lorem ipsum",
            icon : dqac
        },
        {
            title : "Downloads",
            desc : "This allows teachers to download forms and templates ",
            icon : downloads
        },
        {
            title : "Feedback",
            desc : "This shows feedback about a teacher by students and parents.",
            icon : feedback
        },
    ]
  return (
    <div className={styles.cards}>
        {features.map((feature, key) => (
            <div className={styles.card} key = {key}>
                <div className={styles.iconbg}>
                    <img src={feature.icon} alt='icon' className={styles.icon}/>
                </div>
                <div className={styles.title}>{feature.title}</div>
                <p >{feature.desc}</p>
            </div>
        ))}
      
    </div>
  )
}

export default Cards
