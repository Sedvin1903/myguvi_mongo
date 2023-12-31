import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null);
    const [currentUsers, setCurrentUsers] = useState(
      JSON.parse(localStorage.getItem("userbio")) || null);
      const [currentCandidates, setCandidates] = useState(
        JSON.parse(localStorage.getItem("candis")) || null);

// ======================== USER SIDE ======================

  const login = async (inputs) => {
    const res = await axios.post("http://localhost:5000/api/user/login", inputs);
    const userData = res.data;
    setCurrentUser(userData);
  };

  const fetchcandi = async (candis) => {

    setCandidates(candis);
  };


  const setusercandivote = async (input) => {
    const res = await axios.post("http://localhost:5000/api/user/vote",input);
    const userDatavtcnt = res.data;
    setCurrentUser(userDatavtcnt);
  };

// ======================== ADMIN SIDE ======================

const adminhome = async () => {
  const res = await axios.post("http://localhost:5000/api/admin-login");
  const usersData = res.data;
  setCurrentUsers(usersData);
};

  const viewCandidates= async () => {
    const res = await axios.post("http://localhost:5000/api/admin/candidate-upload");
    const userupData = res.data;
    setCandidates(userupData);
  };


// ========================  DUMMY ADDITIONAL ======================

  const getCandidatesvtcnt = async (input) => {
    const res = await axios.post("http://localhost:5000/api/user/vote",input);
    const userbio = res.data;
    setCurrentUsers(userbio);
  };

  const setUservtcnt = async (input) => {
    const res = await axios.post("http://localhost:5000/api/user/vote",input);
    const userb = res.data;
    setCurrentUser(userb);
  };



  // const fetchcandi = async () => {
  //   const res = await axios.get("http://localhost:5000/api/user/login");
  //   const userData = res.data;
  //   setCandidates(userData);
  // };



  const logout = async () => {
    await axios.post("http://localhost:5000/api/user/logout");
    setCurrentUser(null);
    setCurrentUsers(null);
    setCandidates(null);
  };

 
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
    localStorage.setItem("userbio", JSON.stringify(currentUsers));
    localStorage.setItem('candis',JSON.stringify(currentCandidates) );
  }, [currentUser,currentUsers,currentCandidates]);

  return (
    <AuthContext.Provider value={{ currentUser,currentUsers,currentCandidates,login, logout ,getCandidatesvtcnt,setusercandivote,setUservtcnt,fetchcandi,adminhome,viewCandidates}}>
      {children}
    </AuthContext.Provider>
  );
};