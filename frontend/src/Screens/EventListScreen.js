import React, { useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Row, Col } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { createEvent, deleteEvent, listEvents } from '../actions/eventActions'
import { EVENT_CREATE_RESET } from '../constants/eventConstants'

const EventListScreen = ({ history, match }) => {
    const dispatch = useDispatch()

    const eventList = useSelector(state => state.eventList)
    const { loading, error, events } = eventList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const eventDelete = useSelector(state => state.eventDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = eventDelete

    const eventCreate = useSelector(state => state.eventCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, event: createdEvent } = eventCreate

    useEffect(() => {
        dispatch({ type: EVENT_CREATE_RESET })

        if(!userInfo.isAdmin){
            history.push('/login')
        }
        if(successCreate){
            history.push(`/admin/event/${createdEvent._id}/edit`)
        }else{
            dispatch(listEvents())
        }
    }, [dispatch, history, userInfo, successDelete, successCreate, createdEvent])

    const deleteHandler = (id) => {
        if(window.confirm('Are u sure ?')){
            dispatch(deleteEvent(id))
        }
        
    }

    const createEventHandler = () => {
        dispatch(createEvent())
    }

    return (
        <>

            <Row className='align-items-center'>
                <Col>
                    <h1>Events</h1>

                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createEventHandler}>
                        <i className='fas fa-plus'></i> Organize Event
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>} 
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>} 
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>LOCATION</th>
                            </tr>
                        </thead>

                        <tbody>
                            {events.map(event => (
                                <tr key={event._id}>
                                    <td>{event._id}</td>
                                    <td>{event.name}</td>
                                    <td>${event.price}</td>
                                    <td>
                                        {event.category}
                                    </td>
                                    <td>{event.location}</td>
                                    <td>
                                        <LinkContainer to={`/admin/event/${event._id}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(event._id)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                </Table>
            )}
        </>
    )
}

export default EventListScreen
