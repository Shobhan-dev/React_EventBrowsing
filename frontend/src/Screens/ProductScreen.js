import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Image, Row, Col, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import {listProductDetails} from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductScreen = ({history, match})=>{
    const [qty, setQty] = useState(1)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    useEffect(() => {
      dispatch(listProductDetails(match.params.id))
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
                    <Image src={product.image} alt={product.name} fluid />
                </Col>

                <Col md={3}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        {/* <ListGroup.Item>
                            <Rating value={product.rating}/>
                        </ListGroup.Item> */}
                        <ListGroup.Item>
                            <h6>{product.description}</h6>
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
                                        ${product.price}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        <h6>Status:</h6>
                                    </Col>
                                    <Col as='h6'>
                                        {/* {product.countInStock>0?'In Stock' : 'Out of Stock'} */}
                                        {product.countInStock>0?'Available' : 'Not Available'}

                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            {product.countInStock>0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty</Col>
                                        <Col>
                                            <Form.Control as='select' value={qty} onChange={e=>
                                            setQty(e.target.value)}>
                                            
                                            {[...Array(product.countInStock).keys()].map(x=> (
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
                                {/* <Link to={`/cart/${product._id}`}> */}
                                <Button onClick={addToCartHandler} className='btn-block' type='button' disabled={product.countInStock===0}>Add to Cart</Button>
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

export default ProductScreen
