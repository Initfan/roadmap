import React, { useContext } from 'react'
import Modal from './UI/Modal'
import CartContext from '../store/CartContext'
import { currencyFormatter } from '../util/formatting'
import Input from './UI/Input'
import Button from './UI/Button'
import UserProgressContext from '../store/UserProgressContext'
import useHttp from '../hooks/useHttp'

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}

const Checkout = () => {
    const cartCtx = useContext(CartContext)
    const userProgressCtx = useContext(UserProgressContext)

    const { data, isLoading: isSending, error, sendRequest, clearData } = useHttp('http://localhost:3000/orders', requestConfig)

    const cartTotal = cartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price, 0
    )

    const handleSubmit = async (event) => {
        event.preventDefault();

        const fd = new FormData(event.target)
        const customerData = Object.fromEntries(fd.entries())

        await sendRequest(
            JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData,
                }
            })
        )
    }

    const handleFinish = () => {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }

    const handleClose = () => userProgressCtx.hideCheckout()

    return data && !error
        ? <Modal
            open={userProgressCtx.progress === 'checkout'}
            onClose={handleClose}
        >
            <h2>Success!</h2>
            <p>Your order was submitted successfully.</p>
            <p>We wlil get back to you with more deatils via email within the next few minutes.</p>
            <p className="modal-actions">
                <Button onClick={handleFinish}>Okay</Button>
            </p>
        </Modal>
        : <Modal
            open={userProgressCtx.progress === 'checkout'}
            onClose={handleClose}
        >
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
                <Input label='Full Name' type='text' id='name' />
                <Input label='E-Mail Address' type='email' id='email' />
                <Input label='Street' type='text' id='street' />
                <div className="control-row">
                    <Input label='Postal Code' type='text' id='postal-code' />
                    <Input label='City' type='text' id='city' />
                </div>

                <p className="modal-actions">
                    {isSending
                        ? <span>Sending order data...</span>
                        : <>
                            <Button
                                type='button'
                                onClick={() => userProgressCtx.hideCheckout()}
                                textOnly
                            >Close
                            </Button>
                            <Button>Submit Order</Button>
                        </>
                    }
                </p>
            </form>
        </Modal>

}

export default Checkout