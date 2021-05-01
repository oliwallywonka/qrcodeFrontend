import React,{useContext} from "react";
import modalContext from '../../context/modals/modalContext'

import {Formik,Form} from 'formik';
import * as Yup from 'yup';
import {TextField} from '../../components/Fields/TextField';

import {usePostCategory,usePutCategory} from '../../hooks/useCategory'

export default function Modal() {

  const validate = Yup.object({
    category: Yup.string()
      .min(4,'La categoria introducido es muy corta')
      .required('La categoria es obligatoria')
  });

  const {hideModal,visible,payload} = useContext(modalContext);
  const [handlePostRequest] = usePostCategory();
  const [handlePutRequest] = usePutCategory();

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
                    {payload=== null ? 'Nuevo':'Editar'} Categoria
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
                    category: payload===null?'':payload.category,
                  }}
                  validationSchema = {validate}
                  onSubmit = {values =>{
                    payload===null?
                    handlePostRequest({
                      category:values.category,
                    })
                    :handlePutRequest({
                      _id: payload._id,
                      category:values.category,
                    })
                    hideModal();
                  }}
                >
                {(formik)=>(
                 <Form className="mx-4">
                    {/*body*/}
                    <div className="my-4 relative p-6 flex flex-wrap">
                      
                      <div className="w-full px-4">
                      <TextField 
                          label = "Categoria"
                          name = "category"
                          type = "text"
                        />
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