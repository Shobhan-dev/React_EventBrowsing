import express from 'express'
import { authUser, deleteUser, getUserById, getUserprofile, getUsers, registerUser, updateUser, updateUserprofile } from '../controllers/UserController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(registerUser).get(protect, admin,  getUsers)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserprofile).put(protect, updateUserprofile)
router.route('/:id').delete(protect, admin, deleteUser ).get(protect, admin, getUserById).put(protect, admin, updateUser)


export default router