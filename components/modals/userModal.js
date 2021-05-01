import React,{useContext} from "react";
import modalContext from '../../context/modals/modalContext'

import {Formik,Form} from 'formik';
import * as Yup from 'yup';
import {TextField} from '../../components/Fields/TextField';
import {SelectField} from '../../components/Fields/SelectField';

import {usePostUser,usePutUser} from '../../hooks/useUser'

export default function Modal() {

  const validate = Yup.object({
    email: Yup.string()
      .email('El email introducido es invalido')
      .required('El email es obligatorio'),
    password: Yup.string()
      .min(6,'Contraseña es muy corta')
      .required('La contraseña es obligatoria'),
    user: Yup.string()
      .min(4,'El usuario es muy corto')
      .required('El usuario es obligatorio'),
    name: Yup.string()
      .min(4,'El nombre es muy corto')
      .required('El nombre es obligatorio'),
    lastName: Yup.string()
      .min(4,'El apellido es muy corto')
      .required('El apellido es obligatorio'),
    ci: Yup.string()
      .min(8,'El ci es muy corto')
      .required('El ci es obligatorio'),
    rol: Yup.string()
      .required('El rol es obligatorio'),
  });

  const {hideModal,visible,payload} = useContext(modalContext);
  const [handlePostRequest] = usePostUser();
  const [handlePutRequest] = usePutUser();

  return (
    <>
      
      {visible ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-580-px">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h4 className="text-2xl font-semibold">
                    {payload=== null ? 'Nuevo':'Editar'} Usuario
                  </h4>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => hideModal()}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <Formik
                  initialValues={{
                    email: payload===null?'':payload.email,
                    password: '',
                    rol:payload===null?'':payload.rol.rol,
                    user: payload===null?'':payload.user,
                    name: payload===null?'':payload.name,
                    lastName: payload===null?'':payload.lastName,
                    ci: payload===null?'':payload.ci,
                  }}
                  validationSchema = {validate}
                  onSubmit = {values =>{
                    payload===null?
                    handlePostRequest({
                      email:values.email,
                      password:values.password,
                      rol:values.rol,
                      user:values.user,
                      name:values.name,
                      lastName:values.lastName,
                      ci:values.ci,
                    })
                    :handlePutRequest({
                      _id: payload._id,
                      email:payload.email !== values.email && values.email,
                      password:values.password,
                      rol:values.rol,
                      user:values.user,
                      name:values.name,
                      lastName:values.lastName,
                      ci:values.ci,
                    })
                    hideModal();
                  }}
                >
                {(formik)=>(
                 <Form className="mx-4">
                    {/*body*/}
                    <div className="my-4 relative p-6 flex flex-wrap">
                      
                      <div className="w-full lg:w-6/12 px-4">
                      <TextField 
                          label = "User"
                          name = "user"
                          type = "text"
                        />
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <TextField 
                          label = "Password"
                          name = "password"
                          type = "password"
                        />
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <TextField 
                          label = "Email"
                          name = "email"
                          type = "email"
                        />
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <TextField 
                          label = "CI"
                          name = "ci"
                          type = "text"
                        />
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <TextField 
                          label = "Nombre"
                          name = "name"
                          type = "text"
                        />
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <TextField 
                          label = "Apellido"
                          name = "lastName"
                          type = "text"
                        />
                      </div>
                      <div className="w-full px-4">
                        <SelectField
                          id="rol"
                          name="rol"
                          label = "Rol"
                        >
                          <option >Selecciona un rol</option>
                          <option value="admin">Admin</option>
                          <option value="employee">Empleado</option>
                        </SelectField>
                        
                      </div>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        onClick={() => hideModal()}
                      >
                        Cancelar
                      </button>
                      <button
                        className="mx-4 bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Guardar cambios
                      </button>
                    </div>
                  </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}