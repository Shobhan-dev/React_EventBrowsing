import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, Image, Card, ListGroup} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET } from '../constants/orderConstants'

const OrderScreen = ({ match }) => {

    const orderId = match.params.id

    const [sdkReady, setSdkready] = useState(false)

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderPay = useSelector((state) => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const dispatch = useDispatch()
    
    useEffect(() => {
        const addPayPalScript = async () =>{
            const  { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkready(true)
            }
            document.body.appendChild(script)
        }


        if( !order || successPay ){  
                dispatch({ type: ORDER_PAY_RESET })
                dispatch(getOrderDetails(orderId))
            }
        else if(!order.isPaid){
                if(!window.paypal){
                    addPayPalScript()
                }else{
                    setSdkready(true)
                }
            }
    }, [dispatch, successPay, orderId, order]) //if any error remove dispatch from this line 

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))
    }

    
    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : <>
            <h1>Order {order._id}</h1>
            <Row>
                <Col md={6}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>User Info</h2>
                            <p>
                                <strong>Name: </strong>{order.user.name}
                            </p>
                            <p>
                                <strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> : <Message variant='danger'>Not Paid</Message>}
                            
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Ticket Ordered</h2>
                            {order.orderItem.length === 0? <Message>Order is empty</Message> : (
                                <ListGroup variant='flush'>
                                    {order.orderItem.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    {/* <Link to={`/product/${item.product}`}> */}
                                                    <Link to={`/event/${item.event}`}>
                                                    
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Total Price</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tickets</Col>
                                    <Col>${order.totalPrice}</Col> 
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? <Loader /> : (
                                        <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}/>
                                    )}
                                </ListGroup.Item>
                                
                            )}
                            {order.isPaid? 
                            <ListGroup.Item>
                            <button className='btn-sm' variant='light' onClick={() => window.print()}>Print bill</button>
                            </ListGroup.Item>:null}
                        </ListGroup>
                    </Card>
                </Col>
                {/* {order.isPaid? 
                <Col md={2}>
                <button onClick="window.print()">Print</button>
                </Col>:null} */}
            </Row>
    </>
}

export default OrderScreen
