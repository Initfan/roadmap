import express from 'express'
const router = express.Router()
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUsers,
    getUserById,
    updateUsers,
} from '../controller/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/')
    .post(registerUser)
    .get(protect, admin, getUsers)

router.post('/logout', logoutUser)
router.post('/auth', authUser)

router.route('/profile')
    .all(protect)
    .get(getUserProfile)
    .put(updateUserProfile)

router.route('/:id')
    .all(protect, admin)
    .get(getUserById)
    .put(updateUsers)
    .delete(deleteUsers)

export default router;
