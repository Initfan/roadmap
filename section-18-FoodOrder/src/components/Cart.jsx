import React, { useContext } from 'react'
import Modal from './UI/Modal'
import CartContext from '../store/CartContext'
import { currencyFormatter } from '../util/formatting'
import Button from './UI/Button'
import UserProgresContext from '../store/UserProgressContext'
import CartItem from './CartItem'

const Cart = () => {
    const cartCtx = useContext(CartContext)
    const userProgressCtx = useContext(UserProgresContext)

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0)

    const handleCloseCart = () => {
        userProgressCtx.hideCart()
    }

    return <Modal
        className='cart'
        open={userProgressCtx.progress === 'cart'}
        onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null}
    >
        <h2>Your Cart</h2>
        <ul>
            {cartCtx.items.map(item =>
                <CartItem
                    key={item.id}
                    onIncrease={() => cartCtx.addItem(item)}
                    onDecrease={() => cartCtx.removeItem(item.id)}
                    {...item}
                />
            )}
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                {cartCtx.items.length > 0
                    && <Button onClick={() => userProgressCtx.showCheckout()}>
                        Go to Checkout
                    </Button>
                }
            </p>
        </ul>
    </Modal>
}

export default Cart 