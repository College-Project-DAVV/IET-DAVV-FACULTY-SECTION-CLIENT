import React from 'react'
import RightContainer from "../rightContainer/RightContainer";
import LeftContainer from "../leftContainer/LeftContainer";
import styles from './index.module.scss';

const Index = () => {
  return (
    <div className={styles.container}>
        <div className={styles.left}>
            <LeftContainer/>
        </div>
        <div className={styles.right}>
            <RightContainer/>    
        </div> 
    </div>
  )
}

export default Index
