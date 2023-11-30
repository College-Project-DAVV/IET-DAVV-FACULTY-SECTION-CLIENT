import React, { useEffect } from "react";
import styles from "./Search.module.scss";
import { useState } from "react";
import SearchItemCard from "./SearchItemCard";
import StudentModal from "../Modals/StudentModal/StudentModal";
import TeacherModal from "../Modals/TeacherModal/TeacherModal";
import {fetchDataFromAPI} from "../../apis/fetchallusers"
import ProgressBar from "../ProgressBar/ProgressBar";
export default function Search() {
  const [data,setData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [student, setStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("studInfo");
  const [activeTab2, setActiveTab2] = useState("teacherInfo");
  const [fetch,setFetch]=useState(true);
  const openModal = (item) => {
    setStudent(item);
    setActiveTab("studInfo");
    setIsModalOpen(true);
    setSearchQuery("");
  };
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const handleTabChange2 = (tab) => {
    setActiveTab2(tab);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleSearch = (query) => {
    const results = [];
    if (data) {
      for (const item of data) {
        if (
          item.name.toLowerCase().includes(query) ||
          item.email.toLowerCase().includes(query) ||
          (item.rollNumber && item.rollNumber.toLowerCase().includes(query)) ||
          (item.department && item.department.toLowerCase().includes(query))
        ) {
          results.push(item);
        }
      }
    }
    setSearchResults(results);
  };
  const handleInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    handleSearch(query);
  };
  useEffect(()=>{
    fetchDataFromAPI().then((res)=>{
      setFetch(false);
      setData(res);
    })
  },[])
  return (
    <div>
      <div className={styles.searchbarContainer}>
        <form className={styles.searchForm}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search here"
            value={searchQuery}
            onChange={handleInputChange}
          />
        </form>
      </div>
      {
        fetch&&<ProgressBar/>
      }
      {searchQuery && (
        <div className={styles.searchresult}>
          {searchResults.map((element, index) => {
            return (
              <div onClick={() => openModal(element)} key={index}>
                <SearchItemCard item={element} key={index} />
              </div>
            );
          })}
        </div>
      )}
      {isModalOpen && (
          student.designation==="Student"?<StudentModal
            student={student}
            activeTab={activeTab}
            handleTabChange={handleTabChange}
            closeModal={closeModal}
          /> : <TeacherModal
          teacher={student}
            activeTab={activeTab2}
            handleTabChange={handleTabChange2}
            closeModal={closeModal}
           />
        )}  
    </div>
  );
}
