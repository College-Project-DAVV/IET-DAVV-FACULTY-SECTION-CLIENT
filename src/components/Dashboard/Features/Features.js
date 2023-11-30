import React from 'react'
import styles from './features.module.scss'
import Cards from './Cards/Cards'

const Features = () => {
  const username = JSON.parse(localStorage.getItem("user")).name;
  return (
    <div className={styles.features}>
        <p>Welcome {username}</p>
        <div className={styles.cards}>
            <Cards/>
        </div>
    </div>
  )
}

export default Features
