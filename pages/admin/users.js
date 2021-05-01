import React ,{ useContext }from "react";

// components
import CardTableUser from "components/Cards/CardTableUser.js";
import UserModal from '../../components/modals/userModal';

import ModalContext from '../../context/modals/modalContext'


// layout for page

import Admin from "layouts/Admin.js";


export default function Users() {
  const {visible} = useContext(ModalContext);

  return (
    <>
        <div className="flex flex-wrap mt-4">
          <div className="w-full mb-12 px-4">
            <CardTableUser />
             
            {visible?<UserModal/>:null}
          </div>
        </div>
    </>
  );
}

Users.layout = Admin;