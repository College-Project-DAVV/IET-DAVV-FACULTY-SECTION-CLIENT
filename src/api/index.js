import axios from 'axios';

const API = axios.create({baseURL:'https://student.ietdavv.edu.in/server/'});


export const getSubjectsById=(id)=>API.get(`/feedback/subject/getsubject/${id}`);
export const getAllFaculty=()=>API.get(`/feedback/faculty/getfaculty`);
export const addSubjectDB=(data)=>API.post(`/feedback/subject/addSubject`,data);
export const deleteSubjectsById=(id)=>API.get(`/feedback/subject/deleteSubject/${id}`);
export const getAllFeedback=(email)=>API.get(`/feedback/feedback/getfeedback/${email}`);