import express from 'express'
const router = express.Router()
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controller/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/')
    .get(getProducts)
    .post(protect, admin, createProduct)

router.route('/:id')
    .get(getProductById)
    .all(protect, admin)
    .put(updateProduct)
    .delete(deleteProduct)


export default router;
