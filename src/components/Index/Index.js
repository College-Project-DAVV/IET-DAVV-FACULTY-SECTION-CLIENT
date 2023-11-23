import React from 'react'
import RightContainer from "../rightContainer/RightContainer";
import LeftContainer from "../leftContainer/LeftContainer";
import styles from './index.module.scss';
import QuickLinks from '../rightContainer/QuickLinks/QuickLinks';
import { useNavigate } from 'react-router-dom';
const Index = ({setAuthorized}) => {
  const auth = localStorage.getItem("Authorized");
  const navigate = useNavigate();
  if(auth){
    navigate("/dashboard");
    setAuthorized(true);
    return null;
  }
  return (
    <div className={styles.container}>
        <div className={styles.left}>
            <LeftContainer/>
        </div>
        <div className={styles.right}>
            <RightContainer setAuthorized={setAuthorized}/>    
        </div> 
        <div className={styles.links}>
        <QuickLinks/>
        </div>
    </div>
  )
}

export default Index
