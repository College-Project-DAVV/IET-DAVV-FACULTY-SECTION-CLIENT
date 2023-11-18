import React from 'react'
import RightContainer from "../rightContainer/RightContainer";
import LeftContainer from "../leftContainer/LeftContainer";
import styles from './index.module.scss';
import QuickLinks from '../rightContainer/QuickLinks/QuickLinks';
const Index = () => {
  return (
    <div className={styles.container}>
        <div className={styles.left}>
            <LeftContainer/>
        </div>
        <div className={styles.right}>
            <RightContainer/>    
        </div> 
        <div className={styles.links}>
        <QuickLinks/>
        </div>
    </div>
  )
}

export default Index
