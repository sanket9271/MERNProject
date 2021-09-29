import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from './Loader';
import Error from './Error';

const { TabPane } = Tabs;
function Adminscreen() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        window.location.href = '/login'
    }
    return (
        <div className="mt-3 ml-3 mr-3 bs">
            <h2 className='text-center'><b>Admin Panel</b></h2>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Bookings" key="1">
                    <Bookings />
                </TabPane>
                <TabPane tab="Treaks" key="2">
                    <Treaks />
                </TabPane>
                <TabPane tab="Add Treak" key="3">
                    <Addtreak />
                </TabPane>
                <TabPane tab="Users" key="4">
                    <Users />
                </TabPane>
            </Tabs>
        </div>
    )


}

export default Adminscreen

export function Bookings() {
    const [bookings, setbookings] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();
    useEffect(async () => {


        try {

            const data = (await axios.get('/api/bookings/getallbookings')).data
            setbookings(data)
            setloading(false)

        } catch (error) {
            console.log(error)
            setloading(false)
            seterror(error)
        }

    }, []);

    return (
        <div className='row'>
            <div className='col-md-10'>

                {loading ? (<Loader />) : error ? (<Error />) : (<div>

                    <table className='table table-bordered table-dark'>
                        <thead className='bs'>
                            <tr>
                                <th>Booking Id</th>
                                <th>Userid</th>
                                <th>Treak</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(booking => {
                                return <tr>
                                    <td>{booking._id}</td>
                                    <td>{booking.userid}</td>
                                    <td>{booking.treak}</td>
                                    <td>{booking.status}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>

                </div>)}
            </div>
        </div>
    )
}

export function Treaks() {
    const [treaks, settreaks] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();
    useEffect(async () => {


        try {

            const data = (await axios.get('/api/treaks/getalltreaks')).data
            settreaks(data.treaks)
            setloading(false)

        } catch (error) {
            console.log(error)
            setloading(false)
            seterror(error)
        }

    }, []);

    return (
        <div className='row'>
            <div className='col-md-10'>

                {loading ? (<Loader />) : error ? (<Error />) : (<div>

                    <table className='table table-bordered table-dark'>
                        <thead className='bs'>
                            <tr>
                                <th>Treak Id</th>
                                <th>Name</th>
                                <th>Difficulty</th>
                            </tr>
                        </thead>
                        <tbody>
                            {treaks.length && (treaks.map(treak => {
                                return <tr>
                                    <td>{treak._id}</td>
                                    <td>{treak.name}</td>
                                    <td>{treak.difficulty}</td>
                                </tr>
                            }))}
                        </tbody>
                    </table>

                </div>)}
            </div>
        </div>
    )
}

export function Users() {

    const [users, setusers] = useState()
    const [loading, setloading] = useState(true)
    useEffect(async () => {

        try {
            const data = await (await axios.get('/api/users/getallusers')).data
            setusers(data)
            setloading(false)
        } catch (error) {
            console.log(error)
            setloading(false)
        }

    }, [])

    return (
        <div className='row'>
            {loading && (<Loader />)}

            <div className="col-md-10">
                <table className='table table-bordered table-dark'>
                    <thead className='bs'>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>isAdmin</th>
                        </tr>
                    </thead>

                    <tbody>



                        {users && (users.map(user => {
                            return <tr>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                            </tr>
                        }))}
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export function Addtreak() {
    const [treak, settreak] = useState("");
    const [days, setdays] = useState("");
    const [description, setdescription] = useState("");
    const [difficulty, setdifficulty] = useState("");
    const [image1, setimage1] = useState("");
    const [image2, setimage2] = useState("");
    const [image3, setimage3] = useState("");
    async function addTreak()
    {
        const treakobj = {
            treak , 
            description,difficulty ,image1 ,image2 ,image3
        }
        try {
            const result = await axios.post('/api/treaks/addtreak' , treakobj)
        } catch (error) {
            
        }
    }
    return (
      <div className="row">
       
          <div className="col-md-5">
            <input
              difficulty="text"
              className="form-control mt-1"
              placeholder="name"
              value={treak}
              onChange={(e) => {
                settreak(e.target.value);
              }}
            />
  
  
            <input
              difficulty="text"
              className="form-control mt-1"
              placeholder="description"
              value={description}
              onChange={(e) => {
                setdescription(e.target.value);
              }}
            />
            <input
              difficulty="text"
              className="form-control mt-1"
              placeholder="days"
              value={days}
              onChange={(e) => {
                setdescription(e.target.value);
              }}
            />
  
            
          </div>
  
          <div className="col-md-6">
          <input
              difficulty="text"
              className="form-control mt-1"
              placeholder="difficulty"
              value={difficulty}
              onChange={(e) => {
                setdifficulty(e.target.value);
              }}
            />
          <input
              difficulty="text"
              className="form-control mt-1"
              placeholder="Image url 1"
              value={image1}
              onChange={(e) => {
                setimage1(e.target.value);
              }}
            />
            <input
              difficulty="text"
              className="form-control mt-1"
              placeholder="Image url 2"
              value={image2}
              onChange={(e) => {
                setimage2(e.target.value);
              }}
            />
            <input
              difficulty="text"
              className="form-control mt-1"
              placeholder="Image url 3"
              value={image3}
              onChange={(e) => {
                setimage3(e.target.value);
              }}
            />
            <div className='mt-1 text-right'>
            <button className="btn btn-primary" onClick={addTreak}>ADD TREAK</button>
            </div>
          </div>
       
      </div>
    );
  }