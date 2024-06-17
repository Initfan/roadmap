import express from 'express'
const router = express.Router()
import {
    addOrderItems,
    getMyOrders,
    getOrderById,
    getOrders,
    updateOrderToDelivered,
    updateOrderToPaid,
} from '../controller/orderController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

router.route('/')
    .all(protect)
    .get(admin, getOrders)
    .post(addOrderItems)

router.route('/mine')
    .all(protect)
    .get(getMyOrders)

router.route('/:id')
    .all(protect)
    .get(getOrderById)

router.route('/:id/pay')
    .put(protect, updateOrderToPaid)

router.route('/:id/deliver')
    .put(protect, admin, updateOrderToDelivered)

export default router;
