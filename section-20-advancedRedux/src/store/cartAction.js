import { cartActions } from "./cartSlice"
import { uiActions } from "./uiSlice"

export const fetchCartdata = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const res = await fetch('https://react-api-cdd1d-default-rtdb.firebaseio.com/cart.json')

            if (!res.ok)
                throw new Error('Could not fetch cart data!')

            const data = await res.json()

            return data;
        }

        try {
            const cartData = await fetchData()
            dispatch(cartActions.replaceCart(cartData))
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Fetching cart data failed!'
                })
            )
        }
    }
}

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            uiActions.showNotification({
                status: 'pending',
                title: 'Sending...',
                message: 'Seding cart data!'
            })
        )

        const sendRequest = async () => {
            const res = await fetch(
                'https://react-api-cdd1d-default-rtdb.firebaseio.com/cart.json',
                {
                    method: 'PUT',
                    body: JSON.stringify(cart)
                }
            )

            if (!res.ok)
                throw new Error('Sending cart data failed.')
        }

        try {
            await sendRequest()
            dispatch(
                uiActions.showNotification({
                    status: 'success',
                    title: 'Success!',
                    message: 'Seding cart data successfully!'
                })
            )
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Seding cart data failed!'
                })
            )
        }
    }
}