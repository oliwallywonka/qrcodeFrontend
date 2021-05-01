import React,{useContext} from "react";
import modalContext from '../../context/modals/modalContext'

import {Formik,Form} from 'formik';
import * as Yup from 'yup';
import {TextField} from '../../components/Fields/TextField';
import {SelectField} from '../../components/Fields/SelectField';

import {usePostProductDetail,usePutProductDetail} from '../../hooks/useProductDetail'
import {useGetSizes } from '../../hooks/useSize'
import {useGetColors } from '../../hooks/useColor'

export default function Modal({productDetail}) {

  const validate = Yup.object({
    clotheModel: Yup.string()
      .required('El nombre del modelo es obligatorio'),
    color: Yup.string()
      .required('El color es obligatorio'),
    size: Yup.mixed()
        .required('seleccione una talla'),
    clothePicture: Yup.mixed()
  });

  const {hideModal,visible,payload} = useContext(modalContext);
  const [handlePostRequest] = usePostProductDetail();
  const [handlePutRequest] = usePutProductDetail();
  const querySize = useGetSizes();
  const queryColor = useGetColors();

  if(querySize.isLoading || queryColor.isLoading){
    return(
      <>
        <div>Cargando....</div>
      </>
    );
  }

  if(querySize.isError || queryColor.isError){
    return(
      <>
        <div>Error....</div>
      </>
    );
  }

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
                    {payload=== null ? 'Nuevo':'Editar'} 
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
                    color: payload===null?'':payload.color.color,
                    size: payload===null?'':payload.size.size,
                    clotheModel: productDetail._id,
                  }}
                  validationSchema = {validate}
                  onSubmit = {values =>{
                    let data = new FormData();
                    data.append('image',values.image);
                    data.append('size',JSON.stringify(values.size));
                    data.append('clotheModel',values.clotheModel);
                    data.append('color',values.color);
                    data.append('_id',payload._id?payload.id:'vacio');
                    payload===null
                    ?handlePostRequest(data)
                    :handlePutRequest(data);
                    console.log(data.get('_id'))
                    hideModal();
                  }}
                >
                {(formProps)=>(
                 <Form className="mx-4">
                    {/*body*/}
                    <div className="my-4 relative p-6 flex flex-wrap">
                      
                      <div className="w-full  px-4">
                        <SelectField
                          id="color"
                          name="color"
                          label = "Color"
                        >
                          <option >Seleccione un color</option>
                          {queryColor.data.data&&queryColor.data.data.colors.map((color)=>{
                              return(
                                <option value={color._id}>{color.color}</option>
                              )
                          })}
                        </SelectField>
                      </div>
                      {payload === null && querySize.data.data &&querySize.data.data.sizes.map((size)=>{
                        return(
                            <div className="w-full lg:w-3/12 px-4">
                                <TextField 
                                    label = {size.size}
                                    name = "size"
                                    type = "checkbox"
                                    value= {size._id}
                                />
                            </div>
                        )
                      })}
                      {payload &&
                        <SelectField
                          id= "size"
                          name = "size"
                          label = "Talla"
                        >
                          <option>Seleccione una talla</option>
                          {querySize.data.data &&querySize.data.data.sizes.map((size)=>{
                            return(
                              <option value={size._id}>{size.size}</option>
                            )
                          })}
                        </SelectField>
                      }
                      <div className="w-full  px-4">
                        <TextField 
                          label = "Fotografia"
                          name = "clothePicture"
                          type = "file"
                          onChange = {(event)=>{
                            formProps.setFieldValue("image",event.target.files[0])
                          }}
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