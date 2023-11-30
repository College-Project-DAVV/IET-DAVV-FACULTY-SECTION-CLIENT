import React from 'react'
import styles from './quickLinks.module.scss'

const QuickLinks = () => {
    const links = [
        {
            name : "IET Student Portal",
            path : "https://student.ietdavv.edu.in/"
        },
        {
            name : "IET Website",
            path : "https://ietdavv.edu.in/"
        },
        {
            name : "IET Faculty Portal",
            path : "https://faculty.ietdavv.edu.in/"
        },
    ]
  return (
    <div className={styles.quickLink}>
        <div> Quick Links</div>
        <div className={styles.links}>

        
        {links.map((link, key) =>(
                <a 
                key={key}
                href={link.path}
                target="_blank" 
                rel="noopener noreferrer" 
                >
                    {link.name}
                </a>
        ))}
        </div>
    </div>
  )
}

export default QuickLinks
