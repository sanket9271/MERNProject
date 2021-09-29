import React, { useState } from 'react'
import { Modal, Button, Carousel } from 'react-bootstrap'
import {Link} from 'react-router-dom'
function Treak({ treak }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className="row bs">

            <div className="col-md-4">

                <img src={treak.imageurls[0]} className="smallimg" />

            </div>

            <div className="col-md-7">
                <b>
                    <h1>{treak.name}</h1>
                    <p>Cost:{treak.cost}</p>
                    <p>Location:{treak.location}</p>
                    <p>Difficulty:{treak.difficulty}</p>
                </b>
                <div style={{ float: 'right' }}>
                    <Link to={`/book/${treak._id}`}>
                        <button className="btn btn-primary m-2">Book Now</button>
                    </Link>
                    
                    <button className="btn btn-primary" onClick={handleShow}>View Details</button>
                </div>
            </div>
            <Modal show={show} onHide={handleClose} animation={false} size='lg'>
                <Modal.Header>
                    <Modal.Title>{treak.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Carousel prevLabel='' nextLabel=''>

                        {treak.imageurls.map(url=>{
                            return <Carousel.Item>
                                <img
                                    className="d-block w-100 bigimg"
                                    src={url}
                                   
                                />
                            </Carousel.Item>
                        })}
                        
                    </Carousel>
                    <p>{treak.description}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Treak;