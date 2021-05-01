import React ,{ useContext }from "react";

// components
import CardTableCustomer from "components/Cards/CardTableCustomer.js";
import CustomerModal from '../../components/modals/customerModal';

import ModalContext from '../../context/modals/modalContext'


// layout for page

import Admin from "layouts/Admin.js";


export default function Customer() {
  const {visible} = useContext(ModalContext);

  return (
    <>
        <div className="flex flex-wrap mt-4">
          <div className="w-full mb-12 px-4">
            <CardTableCustomer />
             
            {visible?<CustomerModal/>:null}
          </div>
        </div>
    </>
  );
}

Customer.layout = Admin;