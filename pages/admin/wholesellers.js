import React ,{ useContext }from "react";

// components
import CardTableWholeseller from "components/Cards/CardTableWholeseller.js";
import WholesellerModal from '../../components/modals/wholesellerModal';

import ModalContext from '../../context/modals/modalContext'


// layout for page

import Admin from "layouts/Admin.js";


export default function Wholeseller() {
  const {visible} = useContext(ModalContext);

  return (
    <>
        <div className="flex flex-wrap mt-4">
          <div className="w-full mb-12 px-4">
            <CardTableWholeseller />
             
            {visible?<WholesellerModal/>:null}
          </div>
        </div>
    </>
  );
}

Wholeseller.layout = Admin;