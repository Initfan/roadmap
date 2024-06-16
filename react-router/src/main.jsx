import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from './routes/Root'
import ErrorPage from './ErrorPage'
import Contact from './routes/Contact'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />
  },
  {
    path: 'contacts/:contactId',
    element: <Contact />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
