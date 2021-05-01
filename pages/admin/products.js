import React ,{ useContext }from "react";

// components
import TabProduct from '../../components/Tabs/TabProduct'

// layout for page

import Admin from "layouts/Admin.js";


export default function Product() {

  return (
    <>
        <div className="flex flex-wrap mt-4">
          <div className="w-full mb-12 px-4">
            <TabProduct/>
          </div>
        </div>
    </>
  );
}

Product.layout = Admin;