import React, { Fragment, useEffect, useState } from 'react'
import { Link , useLocation, useRouteMatch  } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert, userAlert } from 'react-alert'
import { logout } from '../../actions/userActions'
import { getProductsByCategory } from '../../actions/productActions'

import Search from './Search'
import '../../App.css'


const Header = () => {
  const location = useLocation();
  const showOnRoutes = ['/', '/search'];
  if(location.pathname.startsWith('/search')){
  showOnRoutes.push(location.pathname);
  }
  console.log(showOnRoutes);
  const shouldShow = showOnRoutes.includes(location.pathname);

  const alert = useAlert();
  const dispatch = useDispatch();
  const[category, setCategory]=useState('')


  const { user, loading } = useSelector(state => state.auth);
  const { cartItems } = useSelector(state => state.cart);
  const logoutHandler = () => {
    dispatch(logout());
    alert.success('Logged out successfully.')
  }

  const categories = [
    'MenClothing',          //Includes products such as T-shirts, shirts, jeans, trousers, jackets, sweatshirts, and blazers.
    'WomenClothing',        //Includes products such as sarees, kurtas, salwar suits, dresses, tops, jeans, skirts, and jackets.
    'KidsClothing',         //Includes products such as dresses, t-shirts, shirts, skirts, shorts, jeans, and jackets for boys and girls.
    'Accessories',          //Includes products such as bags, backpacks, wallets, belts, watches, sunglasses, and jewellery for men, women, and kids.
    'Beauty/PersonalCare',  //Includes products such as makeup, skincare, haircare, fragrances, grooming, and wellness products.
    'Home/Living'           //Includes products such as bedsheets, curtains, cushion covers, blankets, rugs, and home decor items.

  ]

  useEffect(() => {

    dispatch(getProductsByCategory(category));
    
  }, [dispatch, category]);

  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to="/">
              <img src="/images/shop_itlogo.png" />
            </Link>
          </div>
        </div>
        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Search />
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <Link to="/cart" style={{ textDecoration: 'none' }}>
            <span id="cart" className="ml-3"> <img src="/images/cart.jpg" width="40px" height="40px" /></span>
            <span className="ml-1" id="cart_count">{cartItems.length}</span>
          </Link>

          {user ? (
            <div className="ml-4 dropdown d-inline">
              <Link to="#!" className="btn dropdown-toggle text-black  mr-4"
                type="button"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={user.avtar && user.avtar.url}
                    alt={user && user.name}
                    className="rounded-circle"
                  />
                </figure>
                <span>{user && user.name}</span>
              </Link>

              <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">

                {user && user.role === 'admin' && (
                  <Link className="dropdown-item text-info" to="/dashboard">Dashboard</Link>
                )}



                <Link className="dropdown-item text-info" to="/orders/me">
                  Orders
                </Link>
                <Link className="dropdown-item text-info" to="/me">
                  Profile
                </Link>
                <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler} >
                  Logout
                </Link>
              </div>
            </div>
          ) : !loading && <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>
          }

        </div>
      </nav>
      {shouldShow ? (
          <div className="row nav2">
          <div className="col d-flex justify-content-center">
              <ul className="d-inline-block navbar-nav mr-2">
                {categories.map(category => (
                  <li className="d-inline-block btn underline-pink mr-2"
                    key={category}
                    onClick={() => setCategory(category)}
                  >
                    <span className="nav-link">{category}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
      ): <div></div>}
      
    </Fragment>
  )
}

export default Header