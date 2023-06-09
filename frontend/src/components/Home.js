import React, { Fragment, useState, useEffect } from 'react'
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';

import MetaData from './layout/MetaData'
import Product from './product/Product'
import Loader from './layout/Loader'

import {  useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { getProducts } from '../actions/productActions'
import { useParams } from "react-router-dom";


const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range)

const Home = () => {

  const params = useParams();
  const [currentPage, setCurrentPage] = useState(1)
  const [price, setPrice] = useState([1, 1000])
  const[category, setCategory]=useState('')
  const[rating, setrating] =useState(0)

  const categories =[
                'MenClothing',          //Includes products such as T-shirts, shirts, jeans, trousers, jackets, sweatshirts, and blazers.
                'WomenClothing',        //Includes products such as sarees, kurtas, salwar suits, dresses, tops, jeans, skirts, and jackets.
                'KidsClothing',         //Includes products such as dresses, t-shirts, shirts, skirts, shorts, jeans, and jackets for boys and girls.
                'Accessories',          //Includes products such as bags, backpacks, wallets, belts, watches, sunglasses, and jewellery for men, women, and kids.
                'Beauty/PersonalCare',  //Includes products such as makeup, skincare, haircare, fragrances, grooming, and wellness products.
                'Home/Living'           //Includes products such as bedsheets, curtains, cushion covers, blankets, rugs, and home decor items.
            
  ]

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, products, error, productCount, resPerPage, filteredProductsCount } = useSelector(state => state.products);

  const keyword = params.keyword;
     
  useEffect(() => {
       if(error){
         return alert.error(error)
        }

       dispatch(getProducts(keyword, currentPage, price, category, rating));

     }, [dispatch, alert, error, keyword, currentPage, price, category, rating])

     function setCurrentPageNo(pageNumber) {
      setCurrentPage(pageNumber)
      }
     
     let count = productCount;
     if(keyword){
      count = filteredProductsCount
     }  

  return (
    <Fragment>
      {loading? <Loader />:(
        <Fragment>
          <MetaData title={'Buy Best Products Online'}/>
           <section id="products" className="container mt-5">
             <div className="row">
               
               {keyword ? (
                <Fragment>
                  <div className="col-6 col-md-3 mt-5 mb-5">
                    <div className="px-5">
                      <Range 
                         marks={{ 
                             1:`₹1`,
                             1000:`₹1000`
                         }}
                         min={1}
                         max={1000}
                         defaultValue={[1, 1000]}
                         tipFormatter={value => `₹${value}`}
                         tipProps={{
                          placement:"top",
                          visible:true
                         }}
                         value={price}
                         onChange={price => setPrice(price)}
                      />

                     <hr className="my-3"/>
                     <div className="mt-5">
                          <h4 className="mb-3">
                            Ratings
                          </h4>
                            <ul className="pl-0">
                              {[5,4,3,2,1].map(star =>(
                                <li
                                   style={{cursor:'pointer',
                                           listStyleType:'none'    
                                  }}
                                  key={star}
                                  onClick={() => setrating(star)}
                                >
                               <div className="rating-outer">
                                <div className="rating-inner"
                                    style={{
                                      width:`${star * 20}%`
                                    }}
                                     

                                >
                                    
                                </div>
                               </div>
                                </li>
                              ))}
                            </ul>
                     </div>
                     <hr className="my-5"/>      
                    </div>
                  </div>
                  <div className="col-6 col-md-9">
                    <div className="row">
                    {products.map(product => (
                  <Product key={product._id} product={product} col={4} />
                   ))}
                    </div>
                  </div>
                </Fragment>
                ): (
                   products.map(product => (
                  <Product key={product._id} product={product} col={3}/>
                   ))
               )}

              </div>
              </section>
                        {resPerPage <= count &&(
                              <div className="d-flex justify-content-center mt-5">
                              <Pagination
                                  activePage={currentPage}
                                  itemsCountPerPage={resPerPage}
                                  totalItemsCount={productCount}
                                  onChange={setCurrentPageNo}
                                  nextPageText={'Next'}
                                  prevPageText={'Prev'}
                                  firstPageText={'First'}
                                  lastPageText={'Last'}
                                  itemClass="page-item"
                                  linkClass="page-link"
                              />
                          </div>
                        )}
                </Fragment>
            )}

        </Fragment>
    )
}

export default Home