import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/Home';
import Products from './pages/Products';
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error'
import ProductDetail from './pages/ProductDetail';

// const routeDefinitions = createRoutesFromElements(
//   <Route>
//     <Route path='/' element={<HomePage />} />
//     <Route path='/products' element={<Products />} />
//   </Route>
// )

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: <Products /> },
      { path: 'products/:id', element: <ProductDetail /> }
    ]
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
