import React, { useContext, useEffect} from "react";

import {Formik,Form} from 'formik'
import {TextField} from '../../components/Fields/TextField'
import * as Yup from 'yup';

import Alert from '../../components/Alerts/Alert'

import AuthContext from "context/auth/authContext";

import cookie from 'cookie';

// layout for page

import Auth from "layouts/Auth.js";
import Router from "next/router";
import AlertContext from "context/alerts/alertContext";

export default function Login({initialAuthenticated,initialUser,initialToken}) {

  const {login,authenticated,message,userRevalidate} = useContext(AuthContext);
  const {alert,showAlert} = useContext(AlertContext);

  const validate = Yup.object({
    email: Yup.string()
      .email('El email introducido es invalido')
      .required('El email es obligatorio'),
    password: Yup.string()
      .min(6,'Contraseña es muy corta')
      .required('La contraseña es obligatoria')
  });

  useEffect(() => {
    if(initialAuthenticated) userRevalidate({initialAuthenticated,initialUser,initialToken});
    if(authenticated){
      Router.push('/admin/dashboard');
    }else{
      Router.push('/auth/login');
    }
    if(message) showAlert(message.msg,message.category)
    console.log(initialAuthenticated)
    console.log(authenticated)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated,message,initialAuthenticated]);
  /*useEffect(()=>{
    console.log(initialAuthenticated)
  },[])*/

  return (
    <>
    
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema = {validate}
      onSubmit = {values =>{
        login(values)
      }}
    >
      {(formik) => (
        
        <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full ">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0 shadow-xl z-10" >
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Login
                  </h6>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Ingresa tus datos</small>
                </div>
                {alert?(<Alert message={message.msg}/>): null}
                <Form>
                  
                <TextField 
                    label = "Email"
                    name = "email"
                    type = "email"
                  />

                  <TextField 
                    label = "Password"
                    name = "password"
                    type = "password"
                  />
                  
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Remember me
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Sign In
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </Formik>
      
    </>
  );
}

Login.getInitialProps = ({req}) => {
  const cookies = cookie.parse(req? req.headers.cookie || "" : document.cookie);
  return {
    initialUser: cookies.user,
    initialToken: cookies.token,
    initialAuthenticated: cookies.authenticated
  };
}

Login.layout = Auth;
