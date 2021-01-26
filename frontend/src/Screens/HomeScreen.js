import React, {useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import Events from '../components/Events'
import { useDispatch, useSelector } from 'react-redux'
import {listEvents} from '../actions/eventActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const HomeScreen = () => {
    const dispatch = useDispatch()
    const eventList = useSelector(state => state.eventList)
    const { loading, error, events } = eventList

    useEffect(() => {
       dispatch(listEvents())
    }, [dispatch])


    return (
        <div>
            <h1>Meetups</h1>
             {loading ? <Loader /> : error? <Message variant='danger'>{error}</Message> : 
             <Row>
             {events.map(event => 
                 <Col key={event._id} sm={12} md={6} lg={4} xl={3} >
                     <Events event={event} />
                 </Col>
             )}
            </Row>}
            
        </div>
    )
}
export default HomeScreen