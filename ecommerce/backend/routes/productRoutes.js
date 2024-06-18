import express from 'express'
const router = express.Router()
import { createProduct, createProductReview, deleteProduct, getProductById, getProducts, getTopProducts, updateProduct } from '../controller/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/')
    .get(getProducts)
    .post(protect, admin, createProduct)

router.get('/top', getTopProducts)

router.route('/:id')
    .get(getProductById)
    .all(protect, admin)
    .put(updateProduct)
    .delete(deleteProduct)

router.route('/:id/reviews')
    .post(protect, createProductReview)



export default router;
