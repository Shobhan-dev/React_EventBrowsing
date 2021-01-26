import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Image, Row, Col, ListGroup, Card, Button, Form } from 'react-bootstrap'
import {listEventDetails} from '../actions/eventActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const EventScreen = ({history, match})=>{
    const [qty, setQty] = useState(1)

    const dispatch = useDispatch()

    const eventDetails = useSelector(state => state.eventDetails)
    const { loading, error, event } = eventDetails

    useEffect(() => {
      dispatch(listEventDetails(match.params.id))
    }, [dispatch,match])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }
    
    return (
        <div>
            <Link to='/'>
                <button className="btn btn-dark rounded my-3" type="button" >Back</button>
            </Link>

            {loading ? <Loader /> : error? <Message variant='danger'>{error}</Message> : (

                <Row>
                <Col md={6}>
                    <Image src={event.image} alt={event.name} fluid />
                </Col>

                <Col md={3}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h3>{event.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h6>{event.description}</h6>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h6>{event.location}</h6>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={3}>
                    <Card>
                        <ListGroup>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        <h6>Price:</h6>
                                    </Col>
                                    <Col as='h6'>
                                        ${event.price}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        <h6>Status:</h6>
                                    </Col>
                                    <Col as='h6'>
                                        {event.countInStock>0?'Available' : 'Not Available'}

                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            {event.countInStock>0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty</Col>
                                        <Col>
                                            <Form.Control as='select' value={qty} onChange={e=>
                                            setQty(e.target.value)}>
                                            
                                            {[...Array(event.countInStock).keys()].map(x=> (
                                                <option key={x+1} value={x+1}>
                                                    {x+1}
                                                </option>
                                            ))}

                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}
                            
                            <ListGroup.Item>
                                {/* <Link to={`/cart/${event._id}`}> */}
                                <Button onClick={addToCartHandler} className='btn-block' type='button' disabled={event.countInStock===0}>Add to Cart</Button>
                                {/* </Link> */}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>

                </Row>
                )}

            
 </div>
    )
}

export default EventScreen
