import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Events ( {event} ){
    return(
        <div>
            <Card className=' my-3 rounded'>
                <Link to={`/event/${event._id}`}>
                    <Card.Img src={event.image} variant='top' alt='some image'/>
                </Link>
                <Card.Body>
                    <Link to={`/event/${event._id}`}>
                        <Card.Title as='h6'>
                        <h5>{event.name}</h5>
                        </Card.Title>
                    </Link>
{/* 
                    <Card.Title as='h6'>
                            <strong>${product.price}</strong>
                        </Card.Title>

                    
                    <Card.Text as='h5'>
                            <Rating value={product.rating}/>
                    </Card.Text> */}
                    
                </Card.Body>
            </Card>
        </div>

    )
}

export default Events