import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutSteps = ({ shipping, confirmOrder, payment }) => {
    return (
        <div className="checkout-progress  mt-5">

            <div class="stepwizard">
                <div class="stepwizard-row">
                    <div class="stepwizard-step">
                        {shipping ? <Link to='/shipping' className="btn btn-default btn-circle step active-step">1</Link> 
                        : <Link to="#!" className="btn btn-default btn-circle step incomplete" disabled>1</Link>}
                        <p>Shiping info</p>
                    </div>
                    <div class="stepwizard-step">
                        {confirmOrder ? <Link to='/order/confirm' className="btn btn-default btn-circle step active-step">2</Link> 
                        : <Link to="#!" className="btn btn-default btn-circle step incomplete" disabled>2</Link>}
                        <p>ConfirmOrder</p>
                    </div>
                    <div class="stepwizard-step">
                    {payment ? <Link to='/payment' className="btn btn-default btn-circle step active-step">3</Link> 
                        : <Link to="#!" className="btn btn-default btn-circle step incomplete" disabled>3</Link>}
                        <p>Payment</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CheckoutSteps