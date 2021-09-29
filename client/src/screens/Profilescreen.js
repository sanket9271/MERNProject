import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd';
import axios from 'axios';
import Swal from "sweetalert2";
import Loader from "./Loader";
import { Tag, Divider } from 'antd';

const { TabPane } = Tabs;
function Profilescreen() {
    const user = JSON.parse(localStorage.getItem('currentUser'))

    useEffect(() => {
        if (!user) {
            window.location.href = '/login'
        }

    }, [])

    return (
        <div className="ml-3 mt-3">
            <Tabs defaultActiveKey="1">
                <TabPane tab="Profile" key="1">

                    <h1>My Profile</h1>
                    <br />
                    <h1>Name : {user.name}</h1>
                    <h1>Email : {user.email}</h1>
                    <h1>is Admin : {user.isAdmin ? 'Yes' : 'No'}</h1>


                </TabPane>
                <TabPane tab="Bookings" key="2">
                    <Mybookings />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Profilescreen



export function Mybookings() {

    const [bookings, setbookings] = useState([]);
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState(false);

    const user = JSON.parse(localStorage.getItem('currentUser'))

    useEffect(async () => {

        try {
            setloading(true)
            const data = await (await axios.post('/api/bookings/getbookingsbyuserid', { userid: user._id })).data
            console.log(data)
            setbookings(data)
            setloading(false)
        } catch (error) {
            console.log(error)
            setloading(false)
            seterror(error)
        }


    }, [])

    async function cancelBooking(bookingid) {
        try {
            setloading(true)
            const result = await (await axios.post('/api/bookings/cancelbooking', { bookingid })).data
            setloading(false)
            Swal.fire('Congrats', 'Your booking has been cancelled', 'success').then(result => {
                window.location.reload()
            })
            console.log(result)
        } catch (error) {
            setloading(false)
            seterror(true)
            Swal.fire('OOps', 'Something Went Wrong', 'error').then(result => {
                window.location.reload()
            })
        }
    }

    return (
        <div>
            <h1>My bookings</h1>
            <div className='row'>
                <div className='col-md-6'>
                    {loading && (<Loader />)}
                    {bookings && (bookings.map(bookings => {

                        return (
                            <div className='bs'>
                                <h1>{bookings.treak}</h1>
                                <p><b>Booking id</b> : {bookings._id}</p>
                                <p><b>Total Amount</b> : {bookings.totalAmount}</p>
                                <p><b>Booking Status</b> : {bookings.status === 'booked' ? (<Tag color="green">Confirmed</Tag>) : (<Tag color="red">Cancelled</Tag>)}</p>
                                <div className='text-right'>
                                    <button className='btn btn-promary' onClick={() => { cancelBooking(bookings._id) }}>Cancel Booking</button>
                                </div>
                            </div>

                        )

                    }))}
                </div>
            </div>
        </div>
    )
}
