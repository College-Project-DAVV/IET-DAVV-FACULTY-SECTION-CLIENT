import React, { useEffect, useState } from "react";

import styles from "./Feedback.module.scss";
import { MdCancel, MdDelete } from "react-icons/md";
import {
  getFeedback,
} from "../../actions/feedbackSession";
import { calculateTimeDifference, formatDate, formatDateToAMPM,isPastDate, } from "../../actions/exportingFunctions";
import { addSubject, deleteSubjects, getFaculty, getSubjects } from "../../actions/subjects";
import { MdArrowCircleLeft } from "react-icons/md";
import { MdAddCircle } from "react-icons/md";
import TimerComponent from "./TimerComponent";
import { MdOutlineArchive } from "react-icons/md";
import { MdLibraryBooks } from "react-icons/md";
import { MdOutlineDashboard } from "react-icons/md";


const Feedback = ({setBOOl}) => {
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState("");
  const [selectedUser, setSelectedUser] = useState({});
  const [editIndex,setEditIndex]=useState(0);
  const [feedback, setFeedback] = useState([]);
  const [create, setCreate] = useState(false);
  const [editFeedback,setEditFeedback]=useState(false);
  const [viewDetails,setViewDetails] = useState(false)
  const [manageState, setManageState] = useState(0);
  const [selectedItem,setSelectedItem]=useState({});
  const [allsubjects,setAllSubjects] = useState([]);
  const [subjectName,setSubjectname]=useState('')
  
  const [subjects, setSubjects] = useState([]);

  const [addMember,setAddMember]=useState(false)
  
  const [selectedSubject,setSelectedSubject]=useState({});
  const [active,setActive]=useState(1);
  
  const handleCreate = async () => {
    setCreate(true);
  };

  
  useEffect(() => {
    const getClassNames = async () => {
      
  const user = JSON.parse(localStorage.getItem("user"));
 
      const res4 = await getFeedback(user.email);
    
      if ( res4?.results) {
      
        setFeedback(res4?.results);
        
    
      }
    };
    getClassNames();
  }, []);
  const handleFeedbackEdit= async(item,index)=>{
    setEditIndex(index)
    setEditFeedback(true);
  setSelectedItem(item)
  const res =  await getSubjects(item.department_id);
  const res1 = await getFaculty();
  setSubjects(item.subjects)
  
  if(res?.results && res1?.results )
  {
    setUsers(res1?.results)
    setAllSubjects(res.results)
  }
  setCreate(true)
  }


  function handleUserClick(item) {
    setSelectedUser(item)
    setUserName(item.title+" "+item.first_name+" "+item.last_name);
    setManageState(0);

  }
  function handleSubjectClick(item) {
    setSelectedSubject(item);
    setSubjectname(item.subject_name);
    setManageState(0);
    
  }
 



  const handleDelete =  async(id) => {
    const res = await deleteSubjects(id)

 const update=feedback[editIndex]?.subjects?.filter(subject => subject.subject_pid !== id);
 const datatoUpdate = feedback
 datatoUpdate[editIndex].subjects=update;
 setFeedback(datatoUpdate)
  setSubjects(update)
  setEditIndex(0);
  };
const handleViewDetails= async(item)=>{
  
  setSubjects(item.subjects)
  setViewDetails(true);
  setSelectedItem(item)
}
const handleAddSubjectToDataBase=async()=>{

  if(selectedSubject && selectedUser)
  {   
    let newitem = {
      subjectId : selectedSubject.id,
      facultyId:selectedUser.id,
      feedbackId:selectedItem.feedback_id
    }
const res = await addSubject(newitem);
    if(res?.results)
    {
      setSubjects(res.results)
      const datatoUpdate = feedback
 datatoUpdate[editIndex].subjects=res.results;
 setFeedback(datatoUpdate)
    setSelectedSubject({});
    setSelectedUser({});
    setSubjectname('');
    setUserName('');
    setAddMember(false)
    }

  }
  else{
    alert("All Fields are required")

  }
}
  const filteredsubject = allsubjects?.filter((item) => {
   
    return (
      // combinedString.toLowerCase().includes(sessionString.toLowerCase()) ||
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(subjectName.toLowerCase())
      )
    );
  });
  const filteredDataUsers = users?.filter((item) => {
    return (
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(userName.toLowerCase())
      )
    );
  });

  function checktimer(item)
  {
    const currentTime = new Date().getTime();
  
  const startss = new Date(item).getTime();
  const isStartTimePassed = currentTime> startss;
  return isStartTimePassed;
  }
  function TimerBox({ item }) {
    
  const currentTime = new Date().getTime();
  
  const startss = new Date(item.startTime).getTime();
  const isStartTimePassed = currentTime> startss;
  
    return (
      <div className={`${styles.card_content_startTIme} ${isStartTimePassed ? styles.completed : ''}`}>
        <div>
          <span className={styles.cardHeadingValues}>
            {isStartTimePassed ? '   Completed' : <TimerComponent item={item} />}
          </span>
        </div>
      </div>
    );
  }

  const currentDate = new Date();
  const TableComponnet = ()=>{

    return(
      <div className={styles.tableContainer}>
      <table>
        <thead className={styles.tableHeader}>
          <tr className={styles.tableHeaderRow}>
            <th>S. No</th>
            <th>Subject Name</th>
            <th>Faculty Name</th>
            <th>Subject Code</th>
            <th>Theory Credit</th>
            <th>Practical Credit</th>
            {create &&<th>Action</th>}
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {subjects.map((subject, index) => (
            <tr key={subject.id} className={styles.tableBodyRow}>
              <td className={styles.tableRowCell}>{index + 1}</td>
              <td className={styles.tableRowCell}>{subject.subject_name}</td>
              <td className={styles.tableRowCell}>{subject.title} {subject.first_name} {subject.last_name}</td>
              <td className={styles.tableRowCell}>{subject.subject_code}</td>
              <td className={styles.tableRowCell}>{subject.theory_credits}</td>
              <td className={styles.tableRowCell}>{subject.practical_credits}</td>
              {create &&
              <td className={styles.tableRowCell}><MdDelete onClick={() => handleDelete(subject.subject_pid)}>Delete</MdDelete></td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )
  }

  return (
    
    <div className={styles.containerFeedbackMain}>
     
      <div className={styles.activeContainer}>
        
      <div className={active==0 && styles.activefeed} onClick={()=>setBOOl(false)}><MdOutlineDashboard/>Dashboard</div>
        <div className={active ===1&& styles.activefeed} onClick={()=>setActive(1)}><MdLibraryBooks/>Active Feedbacks</div>

        <div className={active===2 && styles.activefeed } onClick={()=>setActive(2)}><MdOutlineArchive/>Archived Feedbacks</div>
      </div>
      <div className={styles.feedbackContainer_Card}>
        { feedback.length>0? feedback.map((item, index) => ( 
     ((!checktimer(item.startTime) && active===1) || (checktimer(item.startTime) && active===2) ) &&    (<div className={styles.card_Container}>
            <span className={styles.indexCount}>{index + 1}</span>
            <div className={styles.card_content}>
            <TimerBox item={item}/>
            <div className={styles.card_content_child}>
                <div>
                  <span className={styles.cardHeadings}>Class :</span>
                  <span
                    className={styles.cardHeadingValues}
                  >{` ${item.course_code} ${item.year} Year ${item.department_name} ${item.section}`}</span>
                </div>
                <div>
                  <span className={styles.cardHeadings}>
                    Class Cordinator :{" "}
                  </span>
                  <span className={styles.cardHeadingValues}>{item.name}</span>
                </div>
              </div>

              <div className={styles.card_content_child}>
                <div>
                  <span className={styles.cardHeadings}>Session</span>{" "}
                  <span className={styles.cardHeadingValues}>
                    {formatDate(item.sessionStart)} to{" "}
                    {formatDate(item.sessionEnd)}
                  </span>
                </div>
                <div>
                  <span className={styles.cardHeadings}>
                    Number of Students given Feedback:
                  </span>{" "}
                  <span className={styles.cardHeadingValues}>{item?.total_students/item.subjects.length}</span>
                </div>
              </div>
              <div className={styles.card_content_child}>
                <div>
                  <span className={styles.cardHeadings}>FeedBack Time:</span>
                  <span className={styles.cardHeadingValues}>
                    {formatDateToAMPM(item.startTime, item.endTime)}
                  </span>
                </div>
          
              </div>
        
   
              <div className={styles.card_content_child}>
                <div>
                  <span className={styles.cardHeadings}>Subject Name :</span>
                  {item?.subjects.length>0?item?.subjects?.map((subject, index) => (
  <React.Fragment key={index}>
    <span className={styles.subjectList}>
      {index < item.subjects.length - 1 ? (subject.subject_name + "  ,") :subject.subject_name}
    </span>
  </React.Fragment>
)):<span >Please Add Subjects</span>}

                </div>
              </div>
            </div>
            <div className={styles.card_container_buttons}>
              {isPastDate(item.endTime) && <span className={styles.buttonCard} onClick={(e)=>{
              handleFeedbackEdit(item,index)
            }}>{item.subjects.length===0?" Add Subjects":"Edit"}</span>}
              <span className={styles.buttonCard} onClick={(e)=>handleViewDetails(item)}>View Details</span>
             
            </div>
          </div>
        ))):<div className={styles.nofeedbackContainer}>No FeedBack </div>}
      </div>
      {create && (
        <div className={styles.create_feedback_container}>
          <div className={styles.cancel_container}>
            <span onClick={() => setCreate(false)}>
              <MdCancel className={styles.delete} />
            </span>
          </div>
          <p>  Subject & Faculty Details</p>
          <div className={styles.feedbackform}>
            <div className={styles.addMemberContainerButton}>  
             <span className={styles.submit}
             style={{display:'flex',alignItems:'center',justifyContent:'space-around' }}
                onClick={() => {setAddMember(true)}}
              ><MdAddCircle /><span style={{marginLeft:'5px'}}>Add Subject</span>
              </span></div>
              <div className={styles.createTableContainer}>
          <TableComponnet/>
          </div>
{   addMember &&         <div className={styles.addMemberContainer
            }>
                   <div className={styles.cancel_container}>
            <span onClick={() => setAddMember(false)}>
              <MdCancel className={styles.delete} />
            </span>
          </div>
          <p>Add Subject & Teaching Faculty</p>
            <div className={styles.inputContainer}>
              <div className={styles.inputheading}> Subject Name</div>
              <div className={styles.inputfeild}>
                <input
                  placeholder="Search Subject"
                  value={subjectName}
                  onFocus={() => setManageState(1)}
                  onChange={(e) => setSubjectname(e.target.value)}
                  disabled={false}
                />
                {manageState === 1 && (
                  <div className={styles.dropdownselector}>
                    {filteredsubject.map((item, index) => (
                      <div onClick={() => handleSubjectClick(item)}>
                        {item.subject_name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className={styles.inputContainer}>
              <div className={styles.inputheading}>Faculty Name</div>
              <div className={styles.inputfeild}>
                <input
                  placeholder="Search class"
                  value={userName}
                  onFocus={() => setManageState(2)}
                  onChange={(e) => setUserName(e.target.value)}
                  disabled={false}
                />
                {manageState === 2 && (
                  <div className={styles.dropdownselector}>
                    {filteredDataUsers.map((item, index) => (
                      <div onClick={() => handleUserClick(item)}>
                       {item.title} {item.first_name} {item.last_name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              </div>
              <div className={styles.submitButton}>
              <span
                className={styles.submit}
                onClick={() => {handleAddSubjectToDataBase()}}
              >
              Add Subject
              </span>
            </div>
            </div>}
    
    
          </div>
        </div>
      )}

      {
        viewDetails && <div className={styles.viewDetailsContainer}>
             <div className={styles.cancel_container}>
            <span onClick={() => setViewDetails(false) && setSelectedItem({})}>
              <MdCancel className={styles.delete} />
            </span>
            </div>

            <p>FeedBack Details</p>
            <div className={styles.detailsContainer}>
            <div className={styles.headerDiv}>
                  <span className={styles.cardHeadings}>Class :</span>
                  <span
                    className={styles.cardHeadingValues}
                  >{` ${selectedItem.course_code} ${selectedItem.year} Year ${selectedItem.department_name} ${selectedItem.section}`}</span>
                </div>
                <div className={styles.headerDiv}>
                  <span className={styles.cardHeadings}>
                    Class Cordinator :{" "}
                  </span>
                  <span className={styles.cardHeadingValues}>{selectedItem.name}</span>
                </div>
                <div className={styles.headerDiv}>
                  <span className={styles.cardHeadings}>Session</span>{" "}
                  <span className={styles.cardHeadingValues}>
                    {formatDate(selectedItem.sessionStart)} to{" "}
                    {formatDate(selectedItem.sessionEnd)}
                  </span>
                </div>
                <div className={styles.headerDiv}>
                  <span className={styles.cardHeadings}>
                    Number of Students given Feedback:
                  </span>{" "}
                  <span className={styles.cardHeadingValues}>50</span>
                </div>
                <div className={styles.headerDiv}>
                  <span className={styles.cardHeadings}>FeedBack Time:</span>
                  <span className={styles.cardHeadingValues}>
                    {formatDateToAMPM(selectedItem.startTime, selectedItem.endTime)}
                  </span>
                </div>
              
            </div>
            <TableComponnet/>
        </div>
      }
    </div>
  );
};

export default Feedback;
