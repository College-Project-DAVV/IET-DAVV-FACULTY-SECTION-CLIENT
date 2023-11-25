import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
const ProtectedRoute = ({elements,authorized, children, ...rest}) => {
  const navigate = useNavigate();
  useEffect(()=>{
    console.log(authorized)
    if(!authorized){
      navigate("/");
    }
  },[])
    return (
          <div>{elements}</div>
    );
  };
  export default ProtectedRoute;