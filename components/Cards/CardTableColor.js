import React, {useContext} from "react";
import modalContext from '../../context/modals/modalContext'
import {useGetColors} from '../../hooks/useColor'

import PropTypes from "prop-types";

// components
import TableDropdown from "components/Dropdowns/TableColorDropdown.js";
export default function CardTable({ color }) {

  const {showModal} = useContext(modalContext);

  const query = useGetColors();
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

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                Colores
                <button 
                  className="mx-4 bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" 
                  type="button"
                  onClick={()=>{showModal(null,'color-modal')}}>
                  <i className="fas fa-plus"></i> Añadir Color
                </button>
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Nombre
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Color
                </th>
              </tr>
            </thead>
            <tbody>
              {query.data.data&&query.data.data.colors.map((color)=>{
                
                return(
                  <tr key={color._id}>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {color.color}
                    </td>
                    <td 
                      className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                      style = {{
                        background: color.value,
                        borderRadius: "2rem",
                        color: "white",
                        width: "3rem"
                      }}
                    >
                       {color.value}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                      <TableDropdown color={color}/>
                    </td>
                  </tr>
                )
               
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

CardTable.defaultProps = {
  color: "light",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
