import express from 'express'
import { createEvent, deleteEvent, getEventById, getEvents, updateEvent } from '../controllers/eventController.js'
import { protect, admin } from '../middleware/authMiddleware.js'


const router = express.Router()

router.route('/').get(getEvents).post(protect, admin, createEvent)
router.route('/:id').get(getEventById).delete(protect, admin, deleteEvent).put(protect, admin, updateEvent)

export default router