import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './Loader';
import Error from './Error';
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2';
function Bookingscreen({ match }) {

    const [treak, settreak] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();
    
    useEffect(async () => {

    
        if(!localStorage.getItem('currentUser')){
            window.location.href='/login'
        }
        try {
            setloading(true);
            const data = (await axios.post('/api/treaks/gettreakbyid', { treakid: match.params.treakid })).data;
            settreak(data);
            setloading(false);

        } catch (error) {
            seterror(true);
            setloading(false);
        }

    }, []);

    // async function bookTreak() {
    //     const bookingDetails = {
    //         treak,
    //         userid: JSON.parse(localStorage.getItem('currentUser'))._id,
    //         totalamount: treak.cost
    //     }
    //     try {
    //         const result = await axios.post('/api/bookings/booktreak', bookingDetails)
    //     } catch (error) {

    //     }
    // }

    async function onToken(token){
            console.log(token)
            const bookingDetails = {
                treak,
                userid: JSON.parse(localStorage.getItem('currentUser'))._id,
                totalamount: treak.cost,
                token
            }
            try {
                setloading(true)
                const result = await axios.post('/api/bookings/booktreak', bookingDetails)
                setloading(false)
                Swal.fire('Congratulations','Treak Booked Successfully','success').then(result=>{
                    window.location.href='/profile'
                })
            } catch (error) {
                setloading(false)
                Swal.fire('OOps','Something Went Wrong','error')
            }
        
    }


    return (
        <div className="m-5">

            {loading ? (<Loader />) : error ? (<Error />) : (
                <div className="row justify-content-center bs">
                    <div className="col-md-6">
                        <h1>{treak.name}</h1>
                        <img src={treak.imageurls[0]} className="bigimg"></img>
                    </div>
                    <div className="col-md-6">
                        <h1>Booking Details</h1>
                        <hr />

                        <p>Name : {JSON.parse(localStorage.getItem('currentUser')).name}</p>
                        <hr />
                        <div>
                            <p>Amount : {treak.cost}</p>
                            <hr />
                            <p>Total Days : {treak.days}</p>
                            <hr />
                            <h1><b>Total Amount : {treak.cost}</b></h1>

                            <div style={{ float: 'right' }}>

                                {/* <button className="btn-primary btn" onClick={bookTreak}>Pay Now</button> */}

                                <StripeCheckout
                                    token={onToken}
                                    currency='INR'
                                    amount={treak.cost * 100}
                                    stripeKey="pk_test_51JeP7xSDwsuVEvAcBn7zy67YFKRyhTgtWObnB43aVxsdWDOQxV6YEmL1vm1jQeiAtcYUcA0HZrrKXLkjHdnLODlb00jAEv35U4"
                                />
                            </div>


                        </div>
                    </div>

                </div>
            )}

        </div>

    )

}

export default Bookingscreen;