import React, { useEffect, useState } from "react";
import styles from "./StudentModal.module.scss";
import StudentInfoModal from "./StudentInfoModal/StudentInfoModal"; 
import { fetchDataFromAPI } from "./StudentInfoModal/fetchUserPhoto";
const StudentModal = ({ student, activeTab, handleTabChange, closeModal }) => {
  const [imgUrl, setUrl] = useState("");
  useEffect(()=>{
    if(student.email){
      fetchDataFromAPI(student.email).then((image)=>{
        setUrl(image.imageUrl);
      }).catch((err)=>{
        console.log(err);
      })
    }
  },[student.email])
  return (
    <div className={styles.modal}>
      <div className={styles.data}>
        <div className={styles.head}>
          {imgUrl?<img src={`data:image/jpeg;base64,${imgUrl}`} alt ='profile'className={styles.img}/>:<div className={styles.imgOptional}>{student&&student.name&&student.name[0]}</div>}
          <p className={styles.headName}> {student.name}</p>
        </div>
     
        {activeTab === "studInfo" ? ( <StudentInfoModal student={student}/>) :null}
        <button className={styles.closebtn} onClick={closeModal}> Close </button>
      </div>
    </div>
  );
};

export default StudentModal;
