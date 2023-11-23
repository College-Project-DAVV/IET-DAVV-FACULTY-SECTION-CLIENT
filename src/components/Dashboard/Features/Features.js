import React from 'react'
import styles from './features.module.scss'
import Cards from './Cards/Cards'

const Features = () => {
  return (
    <div className={styles.features}>
        <p>Welcome Dr. Vaibhav Jain!</p>
        <div className={styles.cards}>
            <Cards/>
        </div>
    </div>
  )
}

export default Features
