import React,{useContext,useEffect} from "react";

import Router from 'next/router'

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// Context
import AuthContext from '../context/auth/authContext';

export default function Admin({ children }) {
  const {authenticated} = useContext(AuthContext);
    useEffect(() => {
      if(!authenticated){
         Router.push('/auth/login');
      };
    }, [authenticated])
  
  
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {children}
          <FooterAdmin />
        </div>
      </div>
    </>
    
  );
}
