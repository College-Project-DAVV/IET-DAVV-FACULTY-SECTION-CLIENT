import React,{useState,useEffect} from 'react'
import styles from './TeacherModal.module.scss'
import TeacherInfoModal from './TeacherInfoModal/TeacherInfoModal'
import { fetchDataFromAPI } from "../StudentModal/StudentInfoModal/fetchUserPhoto";
const TeacherModal = ({ teacher, activeTab, handleTabChange, closeModal }) => {
  const [imgUrl, setUrl] = useState("");
  useEffect(()=>{
    if(teacher.email){
      fetchDataFromAPI(teacher.email).then((image)=>{
        setUrl(image.imageUrl);
      }).catch((err)=>{
        console.log(err);
      })
    }
  },[teacher.email])
  return (
    <div className={styles.modal}>
      <div className={styles.data}>
        <div className={styles.head}>
        {imgUrl?<img src={`data:image/jpeg;base64,${imgUrl}`} alt ='profile'className={styles.img}/>:<div className={styles.imgOptional}>{teacher&&teacher.name&&teacher.name[0]}</div>}
          <p className={styles.headName}> {teacher.name}</p>
        </div>
         <TeacherInfoModal teacher={teacher}/>
        <button className={styles.closebtn} onClick={closeModal}> Close </button>
      </div>
    </div>
  )
}
export default TeacherModal