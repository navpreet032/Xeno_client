import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthAction";
import { useNavigate } from "react-router-dom";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  
  try {
    const res = await axios.post("auth/login", user);
    dispatch(loginSuccess(res.data));
    
  } catch (err) {
    dispatch(loginFailure());
  }
};