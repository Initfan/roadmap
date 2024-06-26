import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { useEffect } from 'react';
import { fetchCartdata, sendCartData } from './store/cartAction'

let isInitial = true;

function App() {
  const isCartVisible = useSelector(state => state.ui.cartIsVisible)
  const cart = useSelector(state => state.cart)
  const notification = useSelector(state => state.ui.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCartdata());
  }, [dispatch])

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed)
      dispatch(sendCartData(cart))

  }, [cart, dispatch])

  return (
    <Layout>
      {notification &&
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      }
      {isCartVisible && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;