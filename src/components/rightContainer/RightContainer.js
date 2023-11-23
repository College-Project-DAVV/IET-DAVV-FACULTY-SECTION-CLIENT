import React from 'react'
import Login from './Login/Login'
import QuickLinks from './QuickLinks/QuickLinks';
import styles from './rightContainer.module.scss';

const RightContainer = ({setAuthorized}) => {
  return (
    <div className={styles.right}>
      <Login setAuthorized={setAuthorized}/>
      <div className={styles.links}>
      <QuickLinks />
        </div>
    </div>
  )
}

export default RightContainer;
