import React from 'react'
import Slider from './Slider/Slider';
import styles from './leftContainer.module.scss'
const LeftContainer = () => {
  return (
    <div className={styles.left}>
      <div className={styles.slider}>
        <Slider/>
      </div>
    </div>
  )
}

export default LeftContainer;
