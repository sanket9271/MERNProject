import React from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from "react-router-dom";

AOS.init({
    duration: '2000'
});
function Landingscreen() {
    return (
        <div className="parent">
            
            <div className="landing row justify-content-center text-center">
                <div className="col-md-9 my-auto">
                    
                    <h2 style={{ color: "white", fontSize: "130px" }} data-aos='zoom-in'>TreakMonk</h2>
                    <Link to="/home">
                        <button className='btn btn-primary'>Get Started</button>
                    </Link>
                </div>



            </div>

        </div>
    );
}

export default Landingscreen;