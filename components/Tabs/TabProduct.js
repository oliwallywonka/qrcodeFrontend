import React ,{useContext,useState}from "react";

import CardTableCategory from '../../components/Cards/CardTableCategory';
import CardTableBrand from '../Cards/CardTableBrand';
import CardTableColor from '../Cards/CardTableColor';
import CardTableSize from '../Cards/CardTableSize';
import CardProduct from '../Cards/CardProduct';
import CardProductDetail from '../Cards/CardProductDetail';
import CategoryModal from '../../components/modals/categoryModal';
import BrandModal from '../modals/brandModal';
import ColorModal from '../modals/colorModal'
import SizeModal from '../modals/sizeModal'
import ProductModal from '../modals/productModal'
import ProductDetailModal from '../modals/productDetailModal'


import ModalContext from '../../context/modals/modalContext'

const Tabs = () => {
  const [openTab, setOpenTab] = React.useState(1);
  const [productDetail,setProductDetail] = useState({})
  const {visible,name} = useContext(ModalContext)

  return (
    <>
      <div className="relative flex flex-wrap ">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row "
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 1
                    ? "text-white bg-indigo-600"
                    : "text-indigo-600 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                <i className="fas fa-space-shuttle text-base mr-1"></i> Modelos
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 2
                    ? "text-white bg-indigo-600"
                    : "text-indigo-600 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                <i className="fas fa-cog text-base mr-1"></i>  Categorias
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 3
                    ? "text-white bg-indigo-600"
                    : "text-indigo-600 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                <i className="fas fa-briefcase text-base mr-1"></i>  Marcas
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 4
                    ? "text-white bg-indigo-600"
                    : "text-indigo-600 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(4);
                }}
                data-toggle="tab"
                href="#link4"
                role="tablist"
              >
                <i className="fas fa-briefcase text-base mr-1"></i>  Colores
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 5
                    ? "text-white bg-indigo-600"
                    : "text-indigo-600 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(5);
                }}
                data-toggle="tab"
                href="#link5"
                role="tablist"
              >
                <i className="fas fa-briefcase text-base mr-1"></i>  Tallas
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <CardProduct 
                    setOpenTab={setOpenTab}
                    setProductDetail={setProductDetail}/>

                  {visible && name==='product-modal'?<ProductModal/>:null}
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <CardTableCategory/>

                  {visible && name==='category-modal'?<CategoryModal/>:null}
                </div>
                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                  <CardTableBrand/>

                  {visible && name==='brand-modal'?<BrandModal/>:null}
                </div>
                <div className={openTab === 4 ? "block" : "hidden"} id="link4">
                  <CardTableColor/>

                  {visible && name==='color-modal'?<ColorModal/>:null}
                </div>
                <div className={openTab === 5 ? "block" : "hidden"} id="link5">
                    <CardTableSize/>

                    {visible && name==='size-modal'?<SizeModal/>:null}
                </div>
                <div className={openTab === 6 ? "block" : "hidden"} id="link6">
                    {
                      openTab === 6 
                      ?<CardProductDetail
                        productDetail={productDetail}/>
                        :null
                    }
                      {visible && name==='detail-modal'?<ProductDetailModal productDetail={productDetail}/>:null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tabs;