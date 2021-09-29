import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from './Loader';
import Error from './Error';

function Loginscreen() {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState(false)
    const [success, setsuccess] = useState(false)

    useEffect(() => {

        // if (localStorage.getItem('currentUser')) {
        //     window.location.href = '/home'
        // }

    }, [])

    async function login() {
        const user = {

            email,
            password
        }
        console.log(user)
        try {
            setloading(true)
            const result = await (await axios.post('/api/users/login', user)).data
            setloading(false)
            localStorage.setItem('currentUser', JSON.stringify(result))
           
            if(result.isAdmin===true){
                window.location.href='/admin'
            }
            else{
                window.location.href = '/home'
            }
            
        } catch (error) {
            console.log(error);
            seterror(true)
            setloading(false)
           

        }
    }

    return (
        <div className='login'>
            {loading && (<Loader/>)}
            <div className="row justify-content-center mt-5">
                <div className="col-md-5 mt-5 text-left shadow-lg p-3 mb-5 bg-white rounded">
                    {error && (<Error message='Invalid Credentials' />)}
                    <h2 className="text-center m-2" style={{ fontSize: "35px" }}>
                        Login
                    </h2>

                    <div>
                        <input required type="text" placeholder="email" className="form-control mt-1" value={email} onChange={(e) => { setemail(e.target.value) }} />
                        <input
                            type="text"
                            placeholder="password"
                            className="form-control mt-1"
                            value={password}
                            required
                            onChange={(e) => { setpassword(e.target.value) }}
                        />

                        <button onClick={login} className="btn btn-success mt-3 mb-3 rounded-pill">LOGIN</button>
                        <br />
                        <a style={{ color: 'black' }} href="/register" className="mt-2">Click Here To Register</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loginscreen
