import React from 'react'
import styles from './features.module.scss'
import Cards from './Cards/Cards'
import menu from "../../../assets/menu.svg"

const Features = ({setFeedback,setMenuOpen,openMenu}) => {
  const username = JSON.parse(localStorage.getItem("user")).name;
  return (
    <div className={styles.features}>
        <div className={styles.head}>
        {<div className={styles.menu} onClick={()=>{setMenuOpen(true)}}>
        <img src={menu}/>
        </div>}
        <p>Welcome {username}</p>
        </div>
        <div className={styles.cards}>
            <Cards setFeedback={setFeedback}/>
        </div>
    </div>
  )
}

export default Features
