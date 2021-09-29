import React from 'react'

function Success({message}) {
    return (
        <div>
            <div class="alert alert-success" role="alert">
                {message}
                {/* <h1>Registration Successfull</h1> */}
            </div>
        </div>
    )
}

export default Success
