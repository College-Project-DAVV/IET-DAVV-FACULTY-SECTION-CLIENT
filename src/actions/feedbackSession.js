
import * as api from "../api/index.js";


export const getFeedback = async (email)=>{
    try {
        const {data} = await api.getAllFeedback(email);
        return data
    } catch (error) {
        
    }
}


