import React,{useContext} from "react";
import modalContext from '../../context/modals/modalContext'

import {Formik,Form} from 'formik';
import * as Yup from 'yup';
import {TextField} from '../../components/Fields/TextField';
import {SelectField} from '../../components/Fields/SelectField';

import {usePostProduct,usePutProduct} from '../../hooks/useProduct'
import {useGetBrands } from '../../hooks/useBrand'
import {useGetCategories } from '../../hooks/useCategory'

export default function Modal() {

  const validate = Yup.object({
    clotheModel: Yup.string()
      .min(3,'El nombre del modelo introducido es muy corto')
      .required('El nombre del modelo es obligatorio'),
    refPrice: Yup.number()
      .min(20,'El precio de referencia es muy bajo')
      .required('El precio de referencia es obligatoria'),
    brand: Yup.string()
      .required('La Marca es obligatoria'),
    category: Yup.string()
      .required('La marca es obligatoria'),
    gender: Yup.string()
      .required('La Genero es obligatorio'),
  });

  const {hideModal,visible,payload} = useContext(modalContext);
  const [handlePostRequest] = usePostProduct();
  const [handlePutRequest] = usePutProduct();
  const queryBrand = useGetBrands();
  const queryCategory = useGetCategories();

  if(queryBrand.isLoading || queryCategory.isLoading){
    return(
      <>
        <div>Cargando....</div>
      </>
    );
  }

  if(queryBrand.isError || queryCategory.isError){
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
                    {payload=== null ? 'Nuevo':'Editar'} Modelo
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
                    brand: payload===null?'':payload.brand.brand,
                    category: payload===null?'':payload.category.category,
                    clotheModel: payload===null?'':payload.clotheModel,
                    refPrice: payload===null?'':payload.refPrice,
                    gender: payload===null?'':payload.gender,
                  }}
                  validationSchema = {validate}
                  onSubmit = {values =>{
                    payload===null?
                    handlePostRequest({
                      brand:values.brand,
                      category:values.category,
                      clotheModel:values.clotheModel,
                      name:values.name,
                      refPrice:values.refPrice,
                      gender:values.gender,
                    })
                    :handlePutRequest({
                      _id: payload._id,
                      brand:values.brand,
                      category:values.category,
                      clotheModel:values.clotheModel,
                      refPrice:values.refPrice,
                      gender:values.gender,
                    })
                    hideModal();
                  }}
                >
                {(formik)=>(
                 <Form className="mx-4">
                    {/*body*/}
                    <div className="my-4 relative p-6 flex flex-wrap">
                      
                      <div className="w-full lg:w-6/12 px-4">
                        <SelectField
                          id="brand"
                          name="brand"
                          label = "Marca"
                        >
                          <option >Selecciona una Marca</option>
                          {queryBrand.data.data&&queryBrand.data.data.brands.map((brand)=>{
                              return(
                                <option value={brand._id}>{brand.brand}</option>
                              )
                          })}
                        </SelectField>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                      <SelectField
                          id="category"
                          name="category"
                          label = "Categoria"
                        >
                          <option >Selecciona una categoria</option>
                          {queryCategory.data.data&&queryCategory.data.data.categories.map((category)=>{
                              return(
                                <option value={category._id}>{category.category}</option>
                              )
                          })}
                          
                        </SelectField>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <TextField 
                          label = "Nombre del modelo"
                          name = "clotheModel"
                          type = "text"
                        />
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <TextField 
                          label = "Precio Ref"
                          name = "refPrice"
                          type = "number"
                        />
                      </div>
                      <div className="w-full px-4">
                        <SelectField
                          id="gender"
                          name="gender"
                          label = "Genero"
                        >
                          <option >Selecciona un genero</option>
                          <option value={true}>Hombre</option>
                          <option value={false}>Mujer</option>
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