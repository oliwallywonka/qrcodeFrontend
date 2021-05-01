import React,{useContext} from 'react'      

import modalContext from '../../context/modals/modalContext'
import {useGetProductDetails} from '../../hooks/useProductDetail'

// components
import TableDropdown from "components/Dropdowns/CardProductDetailDropdown.js";

export default function CardProductDetail ({productDetail}) {
    const {showModal} = useContext(modalContext);
    const query = useGetProductDetails(productDetail);
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
            {console.log(query)}
          </>
        );
      }
    return(
        <>
            <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-lg text-blueGray-700">
                        Colores y tallas
                        <button 
                            className="mx-4 bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" 
                            type="button"
                            onClick={()=>{
                                showModal(null,'detail-modal')
                            }}>
                            <i className="fas fa-plus"></i> Añadir 
                        </button>
                    </h3>
                    </div>
                </div>
            </div>
            <div className="my-4 relative p-6 flex flex-wrap">
                {query.data.data&&query.data.data.clothes.map((clothe)=>{
                    return(
                        <>
                            {/*clothe.clothes.map(clothe1=>{
                                return(

                                )
                            })*/}
                            <div className="w-full xl:w-3/12 lg:w-4/12 md:w-6/12 px-4 mr-auto ml-auto">
                                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-blueGray-700">
                                <img
                                    alt="..."
                                    src={clothe.clothes[0].clothePicture?`http://localhost:8000/${clothe.clothes[0].clothePicture.path}`:"/img/default.jpg"}
                                    className="w-full align-middle rounded-t-lg"
                                />
                                <div className="relative p-8 mb-0">
                                    <div className="text-xl font-bold text-white flex">
                                    <h4 className="flex-auto">
                                        Color: {clothe.clothes[0].color.color}
                                    </h4>
                                    <div>

                                    </div>
                                    </div>
                                    {clothe.clothes.map((clothe2)=>{
                                        return (
                                            <>
                                                <div className="flex" key={clothe._id}>
                                                
                                                    <p className="text-md font-light mt-2 text-white flex-auto">
                                                        Talla: {clothe2.size.size}
                                                    </p>
                                                    <p className="text-md font-light mt-2 text-white flex-auto">
                                                        stock: {clothe2.stock}
                                                    </p>
                                                    <TableDropdown productDetail={clothe2}/>
                                                </div>
                                            
                                            </>
                                        )
                                    })}
                                </div>
                                </div>
                            </div>
                        </>
                    )
                })}
                    
            </div>
            
        </>
    )

}