import asyncHandler from 'express-async-handler'
import Event from '../models/eventModel.js'

const getEvents = asyncHandler(async(req, res)=>{
    const events = await Event.find({})
    res.json(events)
})

const getEventById = asyncHandler(async(req, res)=>{
    const event = await Event.findById(req.params.id)

    if(event){
        res.json(event)
    }else{
        res.status(404)
        throw new Error('event not found')
    }
})

const deleteEvent = asyncHandler(async(req, res)=>{
    const event = await Event.findById(req.params.id)

    if(event){
        await event.remove()
        res.json({ message: 'event removed' })
    }else{
        res.status(404)
        throw new Error('event not found')
    }
})

const createEvent = asyncHandler(async(req, res)=>{
    const event = new Event({
        name: 'sample',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        location: 'sample',
        category:'sample',
        countInStock: 0,
        description: 'sample'
    })

    const createdEvent = await event.save()
    res.status(201).json(createdEvent)
})

const updateEvent = asyncHandler(async(req, res)=>{
    const { name,price,description, image, location, category, countInStock } = req.body

    const event = await Event.findById(req.params.id)

    if(event) {
        event.name = name
        event.price = price
        event.description = description
        event.image = image
        event.location = location
        event.category = category
        event.countInStock = countInStock

        const updatedEvent = await event.save()
        res.json(updatedEvent)

    }else{
        res.status(404)
        throw new Error('Event not found')
    }

    
})
export {getEventById, getEvents, deleteEvent, updateEvent, createEvent}