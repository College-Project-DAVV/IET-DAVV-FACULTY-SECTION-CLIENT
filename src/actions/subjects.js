import * as api from "../api/index.js";


export const getSubjects = async(id)=>{

    try {
        const {data}= await api.getSubjectsById(id);
        return data;
    } catch (error) {
        
    }
}

export const getFaculty = async(id)=>{

    try {
        const {data}= await api.getAllFaculty();
        return data;
    } catch (error) {
        
    }
}
export const addSubject = async(formdata)=>{

    try {
        const {data}= await api.addSubjectDB(formdata);
        return data;
    } catch (error) {
        
    }
}
export const deleteSubjects = async(id)=>{

    try {
        const {data}= await api.deleteSubjectsById(id);
        return data;
    } catch (error) {
        
    }
}