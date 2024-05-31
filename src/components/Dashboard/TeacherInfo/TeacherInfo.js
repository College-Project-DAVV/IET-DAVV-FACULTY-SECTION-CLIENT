import React from "react";
import styles from "./teacherInfo.module.scss";
import email from "../../../assets/email2.svg";
import phone from "../../../assets/phone.svg";
import { useNavigate } from "react-router-dom";
import logout from "../../../assets/logout.svg";
import close from "../../../assets/cloase.svg"
const TeacherInfo = ({setOpenMenu,openMenu}) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const info = [
    {
      name: user?user?.name:"Guest",
      email: user?user?.email:"Guest",
      phone: "Not Yet Added",
    },
  ];
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className={styles.teacher}>
     <div className={styles.closeBtn} onClick={()=>{setOpenMenu(!openMenu)}}>
     <img src={close} className={styles.closeBtnImg}/>
      </div>
      {info.map((item, key) => (
        <div className={styles.info} key={key} >
          {item.src ? (
            <img src={item.profile} alt="profile" className={styles.profile} />
          ) : (
            <div className={styles.profileNan}>
              {" "}
              <p>{item && item.name[0]}</p>
            </div>
          )}
          <span className={styles.name}>{item.name}</span>
          <div className={styles.field}>
            <img src={email} alt="email" />
            <span className={styles.head}>Email : </span>
            <span className={styles.value}>{item.email}</span>
          </div>
          <div className={styles.field}>
            <img src={phone} alt="phone" />
            <span className={styles.head}>Phone no : </span>
            <span className={styles.value}>{item.phone}</span>
          </div>
        </div>
      ))}
      <div className={styles.logout} onClick={Logout}>
        <img src={logout} alt="logout" />
        <p>Logout</p>
      </div>
    </div>
  );
};

export default TeacherInfo;
