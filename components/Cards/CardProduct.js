import React,{useContext} from 'react'      

import modalContext from '../../context/modals/modalContext'
import {useGetProducts} from '../../hooks/useProduct'


// components
import TableDropdown from "components/Dropdowns/CardProductDropdown.js";

export default function CardProduct ({setOpenTab,setProductDetail}) {

    const { showModal } = useContext(modalContext);
    const query = useGetProducts();
    if(query.isLoading){
        return(
          <>
            <div>Cargando....</div>
          </>
        );
      }
    
      if(query.isError){
        return(
          <>
            <div>Error....</div>
          </>
        );
      }
    return(
        <>
            <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-lg text-blueGray-700">
                        Modelos
                        <button 
                            className="mx-4 bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" 
                            type="button"
                            onClick={()=>{showModal(null,'product-modal')}}>
                            <i className="fas fa-plus"></i> Añadir Modelo
                        </button>
                    </h3>
                    </div>
                </div>
            </div>
            <div className="my-4 relative p-6 flex flex-wrap">
              {query.data.data&&query.data.data.clotheModels.map((model)=>{
                  return(
                    <div className="w-full xl:w-3/12 lg:w-4/12 md:w-6/12 px-4 mr-auto ml-auto" key={model._id}>
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-blueGray-700">
                        <img
                            alt="..."
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"
                            className="w-full align-middle rounded-t-lg"
                        />
                        <div className="relative p-4 mb-0">
                            <div className="text-xl font-bold text-white flex">
                            <h4 className="flex-auto">
                                Modelo: {model.clotheModel}
                            </h4>
                            <div>

                                <TableDropdown product={model}/>
                            </div>
                            </div>
                            <p className="text-md font-light mt-2 text-white">
                            Categoria: {model.category === undefined ? 'sin categoria':model.category.category}
                            </p>
                            <p className="text-md font-light mt-2 text-white">
                            Marca: {model.brand === undefined ? 'sin marca' :model.brand.brand}
                            </p>
                            <p className="text-md font-light mt-2 text-white">
                            Genero: {model.gender?'Hombre':'Mujer'}
                            </p>
                            <p className="text-md font-light mt-2 mb-8 text-white">
                            Precio de referencia: {model.refPrice}
                            </p>
                            <div className="text-xl font-bold text-white flex flex-wrap mt-2">
                                <button 
                                    className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-full" 
                                    type="button"
                                    onClick={()=>{
                                        setOpenTab(6);
                                        setProductDetail({_id:model._id})
                                    }}>
                                    <i className="fas fa-heart p-2"></i> 
                                    Tallas y colores
                                </button>
                                <button 
                                    className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-full" 
                                    type="button">
                                    <i className="fas fa-heart p-2" ></i> 
                                    Imprimir QR
                                </button>
                            </div>
                        </div>
                        </div>
                    </div>
                  )
              })}
              
            </div>
            
        </>
    )

}
            