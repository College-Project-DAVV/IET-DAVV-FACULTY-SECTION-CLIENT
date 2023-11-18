import React from 'react'
import Login from './Login/Login'
import QuickLinks from './QuickLinks/QuickLinks';
import styles from './rightContainer.module.scss';

const RightContainer = () => {
  return (
    <div className={styles.right}>
      <Login/>
      <QuickLinks/>
    </div>
  )
}

export default RightContainer;
